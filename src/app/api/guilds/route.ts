import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface RawGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

function hasManagePerms(permissions: string): boolean {
  const p = parseInt(permissions, 10);
  return Boolean((p & 0x8) || (p & 0x20));
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const account = await db.account.findFirst({
    where: { userId: session.user.id, provider: "discord" },
    select: { access_token: true },
  });

  if (!account?.access_token) {
    return NextResponse.json({ error: "No access token" }, { status: 400 });
  }

  const [userRes, botRes] = await Promise.all([
    fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: { Authorization: `Bearer ${account.access_token}` },
      cache: "no-store",
    }),
    fetch("https://discord.com/api/v10/users/@me/guilds?limit=200", {
      headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
      next: { revalidate: 120 },
    }),
  ]);

  if (!userRes.ok) return NextResponse.json({ error: "Failed to fetch guilds" }, { status: 500 });

  const userGuilds: RawGuild[] = await userRes.json();
  const botGuildIds = new Set<string>();

  if (botRes.ok) {
    const botGuilds: RawGuild[] = await botRes.json();
    botGuilds.forEach((g) => botGuildIds.add(g.id));
  }

  const result = userGuilds
    .filter((g) => hasManagePerms(g.permissions))
    .map((g) => ({
      id: g.id,
      name: g.name,
      icon: g.icon,
      owner: g.owner,
      botPresent: botGuildIds.has(g.id),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json(result);
}
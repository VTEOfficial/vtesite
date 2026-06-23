import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";
import styles from "./dashboard.module.css";

const CLIENT_ID = "1516645906009690272";

interface DiscordGuild {
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

function guildIconUrl(id: string, icon: string): string {
  return `https://cdn.discordapp.com/icons/${id}/${icon}.png?size=128`;
}

function guildAcronym(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

async function fetchUserGuilds(accessToken: string): Promise<DiscordGuild[]> {
  const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

async function fetchBotGuildIds(): Promise<string[]> {
  const res = await fetch("https://discord.com/api/v10/users/@me/guilds?limit=200", {
    headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
    next: { revalidate: 120 },
  });
  if (!res.ok) return [];
  const guilds: DiscordGuild[] = await res.json();
  return guilds.map((g) => g.id);
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const account = await db.account.findFirst({
    where: { userId: session.user.id, provider: "discord" },
    select: { access_token: true },
  });

  let active: DiscordGuild[] = [];
  let inactive: DiscordGuild[] = [];

  if (account?.access_token) {
    const [userGuilds, botGuildIdList] = await Promise.all([
      fetchUserGuilds(account.access_token),
      fetchBotGuildIds(),
    ]);

    const botGuildIds = new Set(botGuildIdList);
    const eligible = userGuilds.filter((g) => hasManagePerms(g.permissions));

    active = eligible
      .filter((g) => botGuildIds.has(g.id))
      .sort((a, b) => a.name.localeCompare(b.name));

    inactive = eligible
      .filter((g) => !botGuildIds.has(g.id))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  const hasAny = active.length > 0 || inactive.length > 0;
  const inviteBase = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=bot+applications.commands&permissions=8`;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.sub}>Select a server to manage its Vertex configuration.</p>
        </div>
      </div>

      <div className={styles.content}>
        {!hasAny && (
          <div className={styles.empty}>
            <span className={styles.emptyTitle}>No eligible servers</span>
            <p>You need Manage Server or Administrator permissions to configure Vertex.</p>
            <a href={inviteBase} className={styles.addBtn} target="_blank" rel="noopener noreferrer">
              Add Vertex to a server
            </a>
          </div>
        )}

        {active.length > 0 && (
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Your servers</p>
            <div className={styles.grid}>
              {active.map((guild) => (
                <GuildCard key={guild.id} guild={guild} botPresent />
              ))}
            </div>
          </section>
        )}

        {inactive.length > 0 && (
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Add Vertex</p>
            <div className={styles.grid}>
              {inactive.map((guild) => (
                <GuildCard key={guild.id} guild={guild} botPresent={false} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function GuildCard({ guild, botPresent }: { guild: DiscordGuild; botPresent: boolean }) {
  const icon = guild.icon ? guildIconUrl(guild.id, guild.icon) : null;
  const acronym = guildAcronym(guild.name);
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=bot+applications.commands&permissions=8&guild_id=${guild.id}&disable_guild_select=true`;

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        {icon ? (
          <Image src={icon} alt={guild.name} width={48} height={48} className={styles.iconImg} />
        ) : (
          <div className={styles.iconFallback}>{acronym}</div>
        )}
        {guild.owner && (
          <span className={styles.crown} title="Server owner">
            <CrownIcon />
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <span className={styles.cardName}>{guild.name}</span>
        <div className={styles.cardStatus}>
          <span className={`${styles.dot} ${botPresent ? styles.dotActive : styles.dotInactive}`} />
          <span className={styles.cardStatusText}>{botPresent ? "Active" : "Not added"}</span>
        </div>
      </div>

      {botPresent ? (
        <a href={`/dashboard/${guild.id}`} className={styles.manageBtn}>
          Manage
        </a>
      ) : (
        <a href={inviteUrl} className={styles.addServerBtn} target="_blank" rel="noopener noreferrer">
          Add
        </a>
      )}
    </div>
  );
}

function CrownIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 21h20v2H2v-2zM3 10l4 4.5 5-8 5 8 4-4.5-2 11H5L3 10z" />
    </svg>
  );
}
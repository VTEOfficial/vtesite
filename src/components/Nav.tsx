import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NavClient } from "@/components/NavClient";

export async function Nav() {
  const session = await getServerSession(authOptions);
  return <NavClient session={session} />;
}

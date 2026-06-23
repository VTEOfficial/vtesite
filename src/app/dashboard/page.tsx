"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./dashboard.module.css";

const CLIENT_ID = "1516645906009690272";

interface GuildResult {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  botPresent: boolean;
}

type LoadStep = "grabbing" | "validating" | "done";

function iconUrl(id: string, icon: string): string {
  return `https://cdn.discordapp.com/icons/${id}/${icon}.png?size=256`;
}

function acronym(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 21h20v2H2v-2zM3 10l4 4.5 5-8 5 8 4-4.5-2 11H5L3 10z" />
    </svg>
  );
}

function StepItem({ label, state }: { label: string; state: "pending" | "active" | "done" }) {
  let cls = styles.stepPending;
  if (state === "done") cls = styles.stepDone;
  if (state === "active") cls = styles.stepActive;

  return (
    <div className={`${styles.step} ${cls}`}>
      <span className={styles.stepIcon}>
        {state === "done" && <CheckIcon />}
        {state === "active" && <span className={styles.spinner} />}
        {state === "pending" && <span className={styles.stepDot} />}
      </span>
      <span className={styles.stepLabel}>{label}</span>
    </div>
  );
}

function GuildCard({ guild }: { guild: GuildResult }) {
  const guildIcon = guild.icon ? iconUrl(guild.id, guild.icon) : null;
  const parts = [
    "https://discord.com/oauth2/authorize",
    "?client_id=" + CLIENT_ID,
    "&scope=bot+applications.commands",
    "&permissions=8",
    "&guild_id=" + guild.id,
    "&disable_guild_select=true",
  ];
  const inviteUrl = parts.join("");
  const cardHref = guild.botPresent ? "/dashboard/" + guild.id : inviteUrl;
  const isExternal = !guild.botPresent;
  const cardClass = isExternal
    ? styles.card + " " + styles.cardInactive
    : styles.card;

  return (
    <a
      href={cardHref}
      className={cardClass}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <div className={styles.cardIcon}>
        {guildIcon ? (
          <Image
            src={guildIcon}
            alt={guild.name}
            fill
            className={styles.cardImg}
          />
        ) : (
          <div className={styles.cardFallback}>{acronym(guild.name)}</div>
        )}
        {guild.owner && (
          <span className={styles.crown} title="Server owner">
            <CrownIcon />
          </span>
        )}
        <div className={styles.cardHover}>
          <span className={styles.cardAction}>
            {guild.botPresent ? "Manage" : "Add Vertex"}
          </span>
        </div>
      </div>
      <div className={styles.cardName}>{guild.name}</div>
    </a>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [step, setStep] = useState<LoadStep>("grabbing");
  const [guilds, setGuilds] = useState<GuildResult[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const res = await fetch("/api/guilds");
        if (res.status === 401) {
          router.push("/");
          return;
        }
        if (!res.ok) throw new Error("Failed");
        const start = Date.now();
        const data: GuildResult[] = await res.json();
        const elapsed = Date.now() - start;

        await new Promise<void>((r) => setTimeout(r, Math.max(0, 900 - elapsed)));
        if (cancelled) return;

        setStep("validating");

        await new Promise<void>((r) => setTimeout(r, 700));
        if (cancelled) return;

        setGuilds(data);
        setStep("done");
      } catch {
        if (!cancelled) setError(true);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const active = guilds.filter((g) => g.botPresent);
  const inactive = guilds.filter((g) => !g.botPresent);
  const inviteBase =
    "https://discord.com/oauth2/authorize?client_id=" +
    CLIENT_ID +
    "&scope=bot+applications.commands&permissions=8";
  const hasGuilds = guilds.length > 0;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <p className={styles.eyebrow}>Servers</p>
        <h1 className={styles.pageTitle}>Select the server you want to manage</h1>
      </div>

      {!error && step !== "done" && (
        <div className={styles.loader}>
          <StepItem
            label="Grabbing servers"
            state={step === "grabbing" ? "active" : "done"}
          />
          <StepItem
            label="Validating servers"
            state={step === "grabbing" ? "pending" : "active"}
          />
          <p className={styles.loaderHint}>This step usually takes a few seconds...</p>
        </div>
      )}

      {error && (
        <p className={styles.errorMsg}>Failed to load servers. Refresh and try again.</p>
      )}

      {step === "done" && !hasGuilds && (
        <div className={styles.empty}>
          <span className={styles.emptyTitle}>No eligible servers</span>
          <p>You need Manage Server or Administrator permissions to configure Vertex.</p>
          <a
            href={inviteBase}
            className={styles.emptyBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Add Vertex to a server
          </a>
        </div>
      )}

      {step === "done" && hasGuilds && (
        <div className={styles.sections}>
          {active.length > 0 && (
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Your servers</p>
              <div className={styles.grid}>
                {active.map((g) => (
                  <GuildCard key={g.id} guild={g} />
                ))}
              </div>
            </section>
          )}
          {inactive.length > 0 && (
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Add Vertex</p>
              <div className={styles.grid}>
                {inactive.map((g) => (
                  <GuildCard key={g.id} guild={g} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
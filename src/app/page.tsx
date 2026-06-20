import Image from "next/image";
import { LoginButton } from "@/components/LoginButton";
import styles from "./page.module.css";

const modules = [
  {
    tag: "Antinuke",
    title: "Stop nukes before they complete",
    body: "Monitors every privileged action in real time. The moment an account crosses your configured threshold — mass deletes, permission wipes, ban floods — Vertex intervenes and reverts within milliseconds.",
    stats: [{ label: "Avg. response", value: "<80ms" }, { label: "Actions tracked", value: "34" }],
  },
  {
    tag: "Antiraid",
    title: "Coordinated join floods, neutralized",
    body: "Detects account-age patterns, join velocity, and profile signals simultaneously. Automatically locks the server or quarantines arrivals until the threat signature clears.",
    stats: [{ label: "Detection signals", value: "12" }, { label: "Auto-actions", value: "6" }],
  },
  {
    tag: "Moderation",
    title: "A full case system, not just logs",
    body: "Every action — kick, ban, timeout, warn — gets a case ID, responsible moderator, timestamp, and reason. Query, filter, and audit your entire history from the dashboard.",
    stats: [{ label: "Case types", value: "9" }, { label: "Log retention", value: "Unlimited" }],
  },
  {
    tag: "Analytics",
    title: "Understand what's happening",
    body: "Server growth, moderation volume, raid attempts, message activity — surfaced as clear charts on your dashboard. Know your server's health at a glance.",
    stats: [{ label: "Metrics tracked", value: "20+" }, { label: "History", value: "90 days" }],
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "Core protection for any server.",
    features: ["Antinuke (basic thresholds)", "Antiraid (join-rate detection)", "Mod commands + case logs", "5 trusted users", "Standard support"],
    cta: "Get started",
    href: `https://discord.com/oauth2/authorize?client_id=1516645906009690272`,
    highlight: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/mo",
    desc: "Advanced controls for serious servers.",
    features: ["Everything in Free", "Custom thresholds per action type", "Whitelist + role-based trust", "Analytics dashboard", "Auto-lockdown schedules", "Priority support"],
    cta: "Upgrade to Pro",
    href: "/dashboard",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large communities and networks.",
    features: ["Everything in Pro", "Multi-server management", "Custom event pipeline", "Dedicated support channel", "Early access to beta features", "SLA uptime guarantee"],
    cta: "Contact us",
    href: "https://discord.gg/vertex",
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroGlow} />
          <div className={styles.heroGrid} />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>Discord Security Infrastructure</div>
          <h1 className={styles.heroHeadline}>
            Your server stays up.<br />
            <span className={styles.heroAccent}>We make sure of it.</span>
          </h1>
          <p className={styles.heroSub}>
            Vertex watches every privileged action across your server, blocks destructive operations before they complete, and gives your team a full audit trail — from a single dashboard.
          </p>
          <div className={styles.heroActions}>
            <LoginButton />
            <a
              href={`https://discord.com/oauth2/authorize?client_id=1516645906009690272`}
              className={styles.heroSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to Server
            </a>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>34</span>
              <span className={styles.heroStatLabel}>Event types monitored</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>&lt;80ms</span>
              <span className={styles.heroStatLabel}>Avg. intervention time</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>99.9%</span>
              <span className={styles.heroStatLabel}>Uptime</span>
            </div>
          </div>
        </div>
        <div className={styles.heroLogoWrap} aria-hidden="true">
          <Image src="/vertex-logo.png" alt="" width={420} height={420} className={styles.heroLogo} priority />
        </div>
      </section>

      <section className={styles.modules} id="features">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Modules</span>
            <h2 className={styles.sectionTitle}>Built for every threat vector</h2>
            <p className={styles.sectionSub}>Four independent protection layers, each configurable independently.</p>
          </div>
          <div className={styles.moduleGrid}>
            {modules.map((mod) => (
              <div key={mod.tag} className={styles.moduleCard}>
                <span className={styles.moduleTag}>{mod.tag}</span>
                <h3 className={styles.moduleTitle}>{mod.title}</h3>
                <p className={styles.moduleBody}>{mod.body}</p>
                <div className={styles.moduleStats}>
                  {mod.stats.map((s) => (
                    <div key={s.label} className={styles.moduleStat}>
                      <span className={styles.moduleStatValue}>{s.value}</span>
                      <span className={styles.moduleStatLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.trust}>
        <div className={styles.sectionInner}>
          <div className={styles.trustGrid}>
            <div className={styles.trustLeft}>
              <span className={styles.sectionTag}>Zero-trust model</span>
              <h2 className={styles.sectionTitle}>No one gets a free pass</h2>
              <p className={styles.trustBody}>
                Vertex operates on a zero-trust security model. Every action — even from administrators — is evaluated against your configured policy before it executes. Trusted users are explicitly whitelisted, not assumed.
              </p>
              <ul className={styles.trustList}>
                <li>Actions checked against thresholds before completion</li>
                <li>Explicit whitelist required for elevated access</li>
                <li>Full audit trail of every intervention</li>
                <li>Automatic rollback on flagged actions</li>
              </ul>
            </div>
            <div className={styles.trustRight}>
              <div className={styles.trustTerminal}>
                <div className={styles.terminalBar}>
                  <span className={styles.terminalDot} />
                  <span className={styles.terminalDot} />
                  <span className={styles.terminalDot} />
                  <span className={styles.terminalTitle}>vertex — threat log</span>
                </div>
                <div className={styles.terminalBody}>
                  <div className={styles.terminalLine}><span className={styles.tDim}>[14:02:11]</span> <span className={styles.tGreen}>PASS</span> <span className={styles.tMuted}>role_update by trusted#0001</span></div>
                  <div className={styles.terminalLine}><span className={styles.tDim}>[14:02:44]</span> <span className={styles.tYellow}>WARN</span> <span className={styles.tMuted}>ban_add spike detected (3/5)</span></div>
                  <div className={styles.terminalLine}><span className={styles.tDim}>[14:02:45]</span> <span className={styles.tRed}>BLOCK</span> <span className={styles.tMuted}>ban_add exceeded threshold</span></div>
                  <div className={styles.terminalLine}><span className={styles.tDim}>[14:02:45]</span> <span className={styles.tRed}>ACTION</span> <span className={styles.tMuted}>stripped: attacker#9182</span></div>
                  <div className={styles.terminalLine}><span className={styles.tDim}>[14:02:46]</span> <span className={styles.tGreen}>RESTORE</span> <span className={styles.tMuted}>5 bans reversed</span></div>
                  <div className={styles.terminalLine}><span className={styles.tDim}>[14:03:01]</span> <span className={styles.tGreen}>PASS</span> <span className={styles.tMuted}>channel_create by admin#0042</span></div>
                  <div className={styles.terminalLine}><span className={styles.tDim}>[14:03:18]</span> <span className={styles.tYellow}>WARN</span> <span className={styles.tMuted}>join velocity high (28/min)</span></div>
                  <div className={styles.terminalLine}><span className={styles.tDim}>[14:03:18]</span> <span className={styles.tRed}>LOCK</span> <span className={styles.tMuted}>server locked — raid pattern</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pricing} id="pricing">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Pricing</span>
            <h2 className={styles.sectionTitle}>Protection that scales with you</h2>
            <p className={styles.sectionSub}>Start free. Upgrade when your server needs more.</p>
          </div>
          <div className={styles.pricingGrid}>
            {plans.map((plan) => (
              <div key={plan.name} className={`${styles.pricingCard} ${plan.highlight ? styles.pricingHighlight : ""}`}>
                {plan.highlight && <div className={styles.pricingBadge}>Most popular</div>}
                <div className={styles.pricingName}>{plan.name}</div>
                <div className={styles.pricingPrice}>
                  <span className={styles.pricingAmount}>{plan.price}</span>
                  {plan.period && <span className={styles.pricingPeriod}>{plan.period}</span>}
                </div>
                <p className={styles.pricingDesc}>{plan.desc}</p>
                <ul className={styles.pricingFeatures}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.pricingFeature}>
                      <span className={styles.pricingCheck}>&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  className={`${styles.pricingCta} ${plan.highlight ? styles.pricingCtaHighlight : ""}`}
                  target={plan.href.startsWith("http") ? "_blank" : undefined}
                  rel={plan.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Image src="/vertex-logo.png" alt="Vertex" width={32} height={32} className={styles.footerLogo} />
            <div>
              <div className={styles.footerName}>Vertex</div>
              <div className={styles.footerTagline}>Discord security infrastructure</div>
            </div>
          </div>
          <div className={styles.footerCols}>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>General</div>
              <a href="/" className={styles.footerLink}>Home</a>
              <a href="#features" className={styles.footerLink}>Features</a>
              <a href="#pricing" className={styles.footerLink}>Pricing</a>
              <a href={`https://discord.com/oauth2/authorize?client_id=1516645906009690272`} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Add to Server</a>
            </div>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Resources</div>
              <a href="/docs" className={styles.footerLink}>Documentation</a>
              <a href="/dashboard" className={styles.footerLink}>Dashboard</a>
              <a href="https://discord.gg/vertex" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Support Server</a>
              <a href="/changelog" className={styles.footerLink}>Changelog</a>
            </div>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Legal</div>
              <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
              <a href="/terms" className={styles.footerLink}>Terms of Service</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span className={styles.footerCopy}>&copy; {new Date().getFullYear()} Vertex. All rights reserved.</span>
          <span className={styles.footerDomain}>vtebot.xyz</span>
        </div>
      </footer>
    </div>
  );
}

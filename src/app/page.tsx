import styles from "./page.module.css";

const inviteUrl = "https://discord.com/oauth2/authorize?client_id=1516645906009690272";
const supportUrl = "https://discord.gg/vertex";

const modules = [
  {
    name: "Antinuke",
    title: "Stop destructive actions before they spread.",
    body: "Track role edits, channel wipes, ban spikes, permission changes, and escalation patterns with clear thresholds built for real server teams.",
    metric: "34 event types",
  },
  {
    name: "Antiraid",
    title: "Slow down raids without slowing your staff.",
    body: "Detect join velocity, account age clusters, suspicious profile patterns, and repeated entry behavior before the raid reaches your members.",
    metric: "12 signals",
  },
  {
    name: "Moderation",
    title: "Keep every action tied to a case.",
    body: "Warns, kicks, bans, timeouts, reasons, moderators, and audit history stay searchable from one focused control panel.",
    metric: "9 case types",
  },
  {
    name: "Analytics",
    title: "See what is happening at a glance.",
    body: "Surface moderation volume, growth changes, raid attempts, intervention history, and team activity without digging through raw logs.",
    metric: "90 day history",
  },
];

const workflow = [
  { label: "Detect", body: "Vertex watches privileged activity and raid behavior in real time." },
  { label: "Decide", body: "Every signal is evaluated against your configured server policy." },
  { label: "Respond", body: "Unsafe actions are blocked, reversed, logged, and escalated to staff." },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "Core protection for smaller communities.",
    features: ["Basic antinuke thresholds", "Join-rate antiraid checks", "Moderation commands", "Case logging", "5 trusted users"],
    cta: "Get started",
    href: inviteUrl,
    highlight: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/mo",
    desc: "Advanced controls for active servers.",
    features: ["Everything in Free", "Custom action thresholds", "Role-based trust controls", "Analytics dashboard", "Priority support"],
    cta: "Upgrade to Pro",
    href: "/dashboard",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large communities and networks.",
    features: ["Everything in Pro", "Multi-server management", "Custom event rules", "Dedicated support channel", "SLA response planning"],
    cta: "Contact us",
    href: supportUrl,
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a href="#home" className={styles.navBrand} aria-label="Vertex home">
          <img src="/vertex-logo.png" alt="Vertex" className={styles.navLogo} />
        </a>
        <div className={styles.navLinks}>
        </div>
        <a href="/dashboard" className={styles.navAccount} aria-label="Open dashboard">
          <span className={styles.navAvatar} />
          <span className={styles.navChevron} />
        </a>
      </nav>

      <section className={styles.hero} id="home">
        <div className={`${styles.heroCopy} ${styles.reveal}`}>
          <h1 className={styles.heroTitle}>Your server stays online. Vertex keeps it that way.</h1>
          <p className={styles.heroText}>
            Antinuke, antiraid, moderation cases, analytics, and audit response in one clean dashboard for Discord communities that need control without noise.
          </p>
          <div className={styles.heroActions}>
            <a href="/dashboard" className={styles.primaryButton}>
              Get started
            </a>
            <a href={inviteUrl} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
              Add to Server
            </a>
          </div>
        </div>

        <div className={`${styles.heroVisual} ${styles.reveal} ${styles.delayOne}`} aria-hidden="true">
          <div className={styles.browserFrame}>
            <div className={styles.browserTop}>
              <div className={styles.browserControls}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.browserAddress}>vtebot.xyz/dashboard</div>
            </div>
            <div className={styles.dashboardMock}>
              <div className={styles.mockHeader}>
                <div>
                  <span className={styles.mockEyebrow}>Vertex Guard</span>
                  <strong>Protection status</strong>
                </div>
                <span className={styles.livePill}>Live</span>
              </div>
              <div className={styles.signalGrid}>
                <div className={styles.signalCard}>
                  <span>Threats blocked</span>
                  <strong>128</strong>
                </div>
                <div className={styles.signalCard}>
                  <span>Avg. response</span>
                  <strong>80ms</strong>
                </div>
              </div>
              <div className={styles.eventPanel}>
                <div className={styles.eventRow}>
                  <span className={styles.eventStatus}>BLOCK</span>
                  <span>ban_add exceeded threshold</span>
                  <time>14:02</time>
                </div>
                <div className={styles.eventRow}>
                  <span className={styles.eventStatus}>RESTORE</span>
                  <span>permissions rolled back</span>
                  <time>14:03</time>
                </div>
                <div className={styles.eventRow}>
                  <span className={styles.eventStatus}>LOCK</span>
                  <span>join velocity spike contained</span>
                  <time>14:04</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="features">
        <div className={`${styles.sectionHeader} ${styles.reveal}`}>
          <p className={styles.kicker}>Platform</p>
          <h2>Everything your team needs to protect the server.</h2>
          <p>Vertex gives owners and moderators a focused security layer without turning the dashboard into a toy.</p>
        </div>
        <div className={styles.moduleGrid}>
          {modules.map((module, index) => (
            <article key={module.name} className={`${styles.moduleCard} ${styles.reveal} ${index % 2 === 0 ? styles.delayOne : styles.delayTwo}`}>
              <span className={styles.moduleMetric}>{module.metric}</span>
              <h3>{module.name}</h3>
              <strong>{module.title}</strong>
              <p>{module.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.splitSection}`}>
        <div className={`${styles.splitCopy} ${styles.reveal}`}>
          <p className={styles.kicker}>Response flow</p>
          <h2>Built around signal, not clutter.</h2>
          <p>
            Vertex keeps the interface quiet until something matters. When it does, your team gets the context, timeline, action taken, and next step in one place.
          </p>
          <div className={styles.workflowList}>
            {workflow.map((item) => (
              <div key={item.label} className={styles.workflowItem}>
                <span>{item.label}</span>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.auditPanel} ${styles.reveal} ${styles.delayOne}`} aria-label="Example audit timeline">
          <div className={styles.auditHeader}>
            <span>Threat timeline</span>
            <strong>Raid contained</strong>
          </div>
          <div className={styles.auditLine}>
            <span>14:02:11</span>
            <p>New account cluster detected from repeated invite source.</p>
          </div>
          <div className={styles.auditLine}>
            <span>14:02:18</span>
            <p>Server verification tightened and suspicious arrivals quarantined.</p>
          </div>
          <div className={styles.auditLine}>
            <span>14:02:22</span>
            <p>Staff notified with member list, risk score, and recommended review.</p>
          </div>
        </div>
      </section>

      <section className={styles.section} id="pricing">
        <div className={`${styles.sectionHeader} ${styles.reveal}`}>
          <p className={styles.kicker}>Pricing</p>
          <h2>Start simple. Scale when your server needs more.</h2>
          <p>Every plan keeps the same clean Vertex interface. Upgrade only when your policy needs deeper control.</p>
        </div>
        <div className={styles.pricingGrid}>
          {plans.map((plan, index) => (
            <article key={plan.name} className={`${styles.pricingCard} ${plan.highlight ? styles.pricingHighlight : ""} ${styles.reveal} ${index === 1 ? styles.delayOne : styles.delayTwo}`}>
              {plan.highlight && <span className={styles.pricingBadge}>Most popular</span>}
              <h3>{plan.name}</h3>
              <div className={styles.priceLine}>
                <span>{plan.price}</span>
                {plan.period && <small>{plan.period}</small>}
              </div>
              <p>{plan.desc}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className={styles.featureMarker} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={plan.highlight ? styles.primaryButton : styles.secondaryButton}
                target={plan.href.startsWith("http") ? "_blank" : undefined}
                rel={plan.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <img src="/vertex-logo.png" alt="Vertex" />
          <div>
            <strong>Vertex</strong>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="/dashboard">Dashboard</a>
          <a href={supportUrl} target="_blank" rel="noopener noreferrer">
            Support
          </a>
        </div>
      </footer>
    </main>
  );
}

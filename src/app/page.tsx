import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import styles from "./page.module.css";
import { LoginButton } from "@/components/LoginButton";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.badge}>Discord Security Infrastructure</div>
          <h1 className={styles.headline}>
            Protect your server
            <br />
            <span className={styles.accent}>before it&apos;s too late.</span>
          </h1>
          <p className={styles.sub}>
            Vertex monitors your server in real-time, blocks destructive actions before they
            complete, and gives you full audit control over every event.
          </p>
          <div className={styles.actions}>
            <LoginButton />
            <a
              href="https://discord.com/oauth2/authorize?client_id=1516645906009690272"
              className={styles.secondaryBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to Server
            </a>
          </div>
        </div>
        <div className={styles.grid} aria-hidden="true" />
      </section>

      <section className={styles.features}>
        <div className={styles.featuresInner}>
          <div className={styles.featureCard}>
            <span className={styles.featureLabel}>Antinuke</span>
            <h3>Real-time action blocking</h3>
            <p>
              Stops mass channel deletions, role modifications, and ban waves the instant they
              trigger your configured thresholds.
            </p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureLabel}>Antiraid</span>
            <h3>Join-rate detection</h3>
            <p>
              Detects coordinated account floods and automatically locks the server or quarantines
              new members until the threat clears.
            </p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureLabel}>Audit</span>
            <h3>Full case history</h3>
            <p>
              Every moderation action is logged with case IDs, responsible users, timestamps, and
              reason — queryable from the dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

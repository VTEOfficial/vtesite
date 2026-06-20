import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>Vertex</span>
        <div className={styles.links}>
          <a
            href="https://discord.gg/vte"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Support
          </a>
          <Link href="/privacy" className={styles.link}>
            Privacy
          </Link>
          <Link href="/terms" className={styles.link}>
            Terms
          </Link>
        </div>
        <span className={styles.copy}>
          &copy; {new Date().getFullYear()} vtebot.xyz
        </span>
      </div>
    </footer>
  );
}

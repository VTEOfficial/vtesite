import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.sub}>Select a server to manage its configuration.</p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.placeholder}>
          <span className={styles.placeholderLabel}>No servers connected</span>
          <p>Add Vertex to a server to begin managing it here.</p>
          <a
            href="https://discord.com/oauth2/authorize?client_id=1516645906009690272"
            className={styles.addBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Add to Server
          </a>
        </div>
      </div>
    </div>
  );
}

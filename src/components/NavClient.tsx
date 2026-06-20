"use client";

import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

export function NavClient({ session }: { session: Session | null }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Vertex
        </Link>
        <nav className={styles.links}>
          <Link href="/#features" className={styles.link}>
            Features
          </Link>
          <a
            href="https://discord.gg/vte"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Support
          </a>
        </nav>
        <div className={styles.right}>
          {session ? (
            <>
              <Link href="/dashboard" className={styles.dashBtn}>
                Dashboard
              </Link>
              {session.user.image && (
                <button
                  className={styles.avatar}
                  onClick={() => signOut({ callbackUrl: "/" })}
                  title="Sign out"
                >
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    width={32}
                    height={32}
                    className={styles.avatarImg}
                  />
                </button>
              )}
            </>
          ) : (
            <Link href="/api/auth/signin" className={styles.loginBtn}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

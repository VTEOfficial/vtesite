"use client";

import { signIn } from "next-auth/react";
import styles from "./LoginButton.module.css";

export function LoginButton() {
  return (
    <button
      className={styles.btn}
      onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
    >
      Login with Discord
    </button>
  );
}

"use client";

import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export function Button({ variant = "primary", loading = false, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={[styles.btn, styles[variant], props.className].filter(Boolean).join(" ")}
    >
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
}

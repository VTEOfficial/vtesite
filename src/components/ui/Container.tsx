import styles from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Container({ children, size = "md", className }: ContainerProps) {
  return (
    <div className={[styles.container, styles[size], className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

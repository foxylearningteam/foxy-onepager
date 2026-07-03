import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary";
  size?: "md" | "lg";
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-nunito text-lg font-black uppercase tracking-[0.11em] text-white transition-all duration-150 disabled:opacity-60 disabled:pointer-events-none";
  const variants: Record<string, string> = {
    // Chunky button: purple face with a darker bottom lip that compresses on press.
    primary:
      "bg-purple shadow-[0_3px_0_0_var(--color-button-edge)] hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_0_var(--color-button-edge)]",
  };
  const sizes: Record<string, string> = {
    md: "px-9 py-3.5",
    lg: "px-12 py-4",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

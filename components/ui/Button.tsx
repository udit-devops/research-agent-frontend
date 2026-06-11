import { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "dark" | "outline" | "sand";
  loading?: boolean;
  style?: CSSProperties;
}

const variantClass: Record<string, string> = {
  dark: "pill pill-dark",
  outline: "pill pill-outline",
  sand: "pill pill-sand",
};

export default function Button({
  children,
  variant = "dark",
  loading = false,
  disabled,
  className = "",
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`${variantClass[variant]} ${className}`}
      style={{ fontSize: "0.9375rem", padding: "0.75rem 1.75rem", ...style }}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
          Working…
        </>
      ) : (
        children
      )}
    </button>
  );
}

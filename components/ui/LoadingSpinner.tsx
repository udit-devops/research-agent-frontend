interface LoadingSpinnerProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "w-5 h-5", md: "w-9 h-9", lg: "w-14 h-14" };

export default function LoadingSpinner({ label = "Loading…", size = "md" }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-5" role="status" aria-label={label}>
      <span
        className={`${sizeMap[size]} border-2 rounded-full animate-spin`}
        style={{ borderColor: "var(--border)", borderTopColor: "var(--sand)" }}
        aria-hidden="true"
      />
      <p style={{ fontSize: "0.9375rem", color: "var(--sand)", fontWeight: 500 }}>{label}</p>
    </div>
  );
}

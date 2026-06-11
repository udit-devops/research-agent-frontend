import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="flex items-start gap-4 p-5"
      style={{
        backgroundColor: "#F9F1E8",
        border: "1px solid var(--border)",
        borderLeft: "3px solid var(--sand)",
      }}
      role="alert"
    >
      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--sand)" }} aria-hidden="true" />
      <div>
        <p style={{ fontSize: "0.9375rem", color: "var(--ink-light)" }}>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="hover:opacity-60 transition-opacity"
            style={{
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              color: "var(--accent)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

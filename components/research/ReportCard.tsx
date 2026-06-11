import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReportSummary } from "@/lib/types";

interface ReportCardProps {
  report: ReportSummary;
  index: number;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function ReportCard({ report, index }: ReportCardProps) {
  return (
    <Link
      href={`/reports/${report.id}`}
      className="group"
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "2rem",
        padding: "2rem 0",
        borderBottom: "1px solid var(--border)",
        textDecoration: "none",
        transition: "opacity 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", flex: 1, minWidth: 0 }}>
        {/* Index number */}
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "1rem",
            color: "var(--border)",
            lineHeight: 1,
            paddingTop: "0.375rem",
            minWidth: "2rem",
            flexShrink: 0,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--sand)",
              marginBottom: "0.5rem",
              fontWeight: 500,
            }}
          >
            {formatDate(report.created_at)}
          </p>
          <h3
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "1.5rem",
              color: "var(--ink)",
              lineHeight: 1.25,
              transition: "opacity 0.15s",
            }}
            className="group-hover:opacity-60"
          >
            {report.topic}
          </h3>
        </div>
      </div>

      <ArrowUpRight
        className="w-5 h-5 shrink-0 opacity-25 group-hover:opacity-70 transition-opacity"
        style={{ color: "var(--ink)", marginTop: "0.75rem" }}
        aria-hidden="true"
      />
    </Link>
  );
}

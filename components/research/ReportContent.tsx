import { ExternalLink } from "lucide-react";
import type { ReportDetail, ResearchResponse } from "@/lib/types";

type ReportData = ReportDetail | (ResearchResponse & { topic: string });

interface ReportContentProps {
  data: ReportData;
}

function isReportDetail(data: ReportData): data is ReportDetail {
  return "id" in data;
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

function renderReportText(text: string): string {
  return text
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hul])/, "<p>")
    .concat("</p>")
    .replace(/<p><\/p>/g, "");
}

function isValidUrl(str: string): boolean {
  try { new URL(str); return true; } catch { return false; }
}

function getDisplayUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "") + u.pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
}

export default function ReportContent({ data }: ReportContentProps) {
  const isDetail = isReportDetail(data);
  const html = renderReportText(data.report);

  return (
    <article style={{ backgroundColor: "var(--parchment)" }}>
      {/* Full-width topic banner */}
      <header
        style={{
          padding: "5rem 3rem 4rem",
          maxWidth: "1400px",
          margin: "0 auto",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {isDetail && data.created_at && (
          <p
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--sand)",
              marginBottom: "1.5rem",
              fontWeight: 500,
            }}
          >
            {formatDate(data.created_at)}
          </p>
        )}
        <h1
          className="display-serif"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "var(--ink)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            maxWidth: "14ch",
          }}
        >
          {data.topic}
        </h1>
      </header>

      {/* Body */}
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "4rem 3rem 6rem",
        }}
      >
        <div className="report-prose" dangerouslySetInnerHTML={{ __html: html }} />

        {data.sources && data.sources.length > 0 && (
          <section style={{ marginTop: "5rem" }}>
            <hr className="rule" style={{ marginBottom: "3rem" }} />
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "1.75rem",
                color: "var(--ink)",
                marginBottom: "1.75rem",
              }}
            >
              Sources
            </h2>
            <ol style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {data.sources.map((source, index) => {
                const valid = isValidUrl(source);
                return (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      fontSize: "0.9375rem",
                      color: "var(--ink-muted)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        color: "var(--border)",
                        minWidth: "2rem",
                        flexShrink: 0,
                        paddingTop: "0.1rem",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {valid ? (
                      <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--accent)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          wordBreak: "break-all",
                          transition: "opacity 0.15s",
                        }}
                        className="hover:opacity-60"
                      >
                        {getDisplayUrl(source)}
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    ) : (
                      <span style={{ wordBreak: "break-word" }}>{source}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        )}
      </div>
    </article>
  );
}

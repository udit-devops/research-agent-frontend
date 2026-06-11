"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import ReportCard from "@/components/research/ReportCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { api } from "@/lib/api";
import type { ReportSummary } from "@/lib/types";

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  async function fetchReports() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getReports();
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchReports(); }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return reports;
    return reports.filter((r) => r.topic.toLowerCase().includes(query.toLowerCase()));
  }, [reports, query]);

  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>

      {/* Page header */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "6rem 3rem 4rem",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--sand)",
              fontWeight: 500,
              marginBottom: "1.5rem",
            }}
          >
            Research library
          </p>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
            }}
          >
            Your reports
          </h1>
        </div>

        <Link
          href="/generate"
          className="pill pill-dark"
          style={{ fontSize: "0.9375rem", padding: "0.875rem 2rem", marginBottom: "0.5rem" }}
        >
          New report <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem" }}>

        {/* Search bar */}
        {reports.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 1.5rem",
              border: "1.5px solid var(--border)",
              backgroundColor: "var(--cream)",
              maxWidth: "480px",
              marginBottom: "3rem",
            }}
          >
            <Search className="w-4 h-4 shrink-0" style={{ color: "var(--sand)" }} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reports…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.9375rem",
                color: "var(--ink)",
              }}
              aria-label="Search reports"
            />
          </div>
        )}

        {/* States */}
        {loading && (
          <div style={{ padding: "8rem 0", display: "flex", justifyContent: "center" }}>
            <LoadingSpinner label="Fetching your library…" />
          </div>
        )}

        {!loading && error && <ErrorMessage message={error} onRetry={fetchReports} />}

        {!loading && !error && reports.length === 0 && (
          <div
            style={{
              padding: "6rem 3rem",
              textAlign: "center",
              border: "1px solid var(--border)",
              backgroundColor: "var(--cream)",
            }}
          >
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "2rem",
                color: "var(--ink)",
                marginBottom: "1rem",
              }}
            >
              No reports yet
            </p>
            <p style={{ fontSize: "0.9375rem", color: "var(--ink-muted)", marginBottom: "2.5rem" }}>
              Your research library is empty. Generate your first report to get started.
            </p>
            <Link
              href="/generate"
              className="pill pill-dark"
              style={{ fontSize: "0.9375rem", padding: "0.875rem 2rem" }}
            >
              Start researching <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        {!loading && !error && reports.length > 0 && filtered.length === 0 && (
          <div
            style={{
              padding: "5rem 3rem",
              textAlign: "center",
              border: "1px solid var(--border)",
              backgroundColor: "var(--cream)",
            }}
          >
            <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.75rem", color: "var(--ink)", marginBottom: "0.75rem" }}>
              No matches found
            </p>
            <p style={{ fontSize: "0.9375rem", color: "var(--ink-muted)" }}>
              Try a different search term.
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <div>
              <hr className="rule-heavy" />
              {filtered.map((report, i) => (
                <ReportCard key={report.id} report={report} index={i} />
              ))}
            </div>

            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "0.8125rem",
                color: "var(--sand)",
                textAlign: "right",
              }}
            >
              {filtered.length} {filtered.length === 1 ? "report" : "reports"}
              {query ? ` matching "${query}"` : ""}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

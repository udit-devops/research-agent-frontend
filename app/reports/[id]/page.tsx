"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PenLine } from "lucide-react";
import ReportContent from "@/components/research/ReportContent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { api } from "@/lib/api";
import type { ReportDetail } from "@/lib/types";

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchReport() {
    if (!id || isNaN(id)) { router.replace("/reports"); return; }
    setLoading(true);
    setError(null);
    try {
      const data = await api.getReport(id);
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load this report.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchReport(); }, [id]);

  return (
    <div style={{ backgroundColor: "var(--parchment)" }}>

      {/* Sub-nav */}
      <div
        style={{
          backgroundColor: "var(--cream)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem", height: "3.5rem" }}
          className="flex items-center justify-between"
        >
          <Link
            href="/reports"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: "var(--ink-muted)",
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            className="hover:opacity-60"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Library
          </Link>
          <Link
            href="/generate"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: "var(--ink-muted)",
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            className="hover:opacity-60"
          >
            <PenLine className="w-4 h-4" aria-hidden="true" /> New report
          </Link>
        </div>
      </div>

      {loading && (
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LoadingSpinner label="Loading report…" size="lg" />
        </div>
      )}

      {!loading && error && (
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "4rem 3rem" }}>
          <ErrorMessage message={error} onRetry={fetchReport} />
          <Link
            href="/reports"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1.5rem",
              fontSize: "0.875rem",
              color: "var(--ink-muted)",
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            className="hover:opacity-60"
          >
            <ArrowLeft className="w-4 h-4" /> Back to library
          </Link>
        </div>
      )}

      {!loading && !error && report && <ReportContent data={report} />}

    </div>
  );
}

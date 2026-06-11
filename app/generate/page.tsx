"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookMarked } from "lucide-react";
import ResearchForm from "@/components/research/ResearchForm";
import ReportContent from "@/components/research/ReportContent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { ResearchResponse } from "@/lib/types";

const suggestions = [
  "The future of nuclear energy",
  "How venture capital actually works",
  "The history of the global supply chain",
  "What is quantum computing, really",
];

function GeneratePageInner() {
  const searchParams = useSearchParams();
  const prefillTopic = searchParams.get("topic") ?? "";
  const [result, setResult] = useState<(ResearchResponse & { topic: string }) | null>(null);

  function handleSuccess(data: ResearchResponse, topic: string) {
    setResult({ ...data, topic });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (result) {
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
            <button
              onClick={() => setResult(null)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                color: "var(--ink-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.15s",
              }}
              className="hover:opacity-60"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> New report
            </button>
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
              <BookMarked className="w-4 h-4" aria-hidden="true" /> Library
            </Link>
          </div>
        </div>
        <ReportContent data={result} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "80vh" }}>

      {/* Page header */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "6rem 3rem 4rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
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
          New report
        </p>
        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            marginBottom: "2rem",
          }}
        >
          What would you{" "}
          <em>like to research?</em>
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--ink-light)", maxWidth: "52ch", lineHeight: 1.65 }}>
          Enter a topic, question, or subject area. The more specific, the sharper the report.
        </p>
      </div>

      {/* Form */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "4rem 3rem",
        }}
      >
        <div style={{ maxWidth: "720px" }}>
          <ResearchForm onSuccess={handleSuccess} initialTopic={prefillTopic} />
        </div>

        {/* Suggestions */}
        <div style={{ marginTop: "5rem", maxWidth: "720px" }}>
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
            Not sure where to start?
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1px",
              backgroundColor: "var(--border)",
              border: "1px solid var(--border)",
            }}
          >
            {suggestions.map((s) => (
              <Link
                key={s}
                href={`/generate?topic=${encodeURIComponent(s)}`}
                style={{
                  display: "block",
                  padding: "1.5rem",
                  backgroundColor: "var(--cream)",
                  fontSize: "0.9375rem",
                  color: "var(--ink-light)",
                  textDecoration: "none",
                  transition: "background-color 0.15s",
                  lineHeight: 1.5,
                }}
                className="hover:bg-parchment"
              >
                {s} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <LoadingSpinner label="Loading…" />
        </div>
      }
    >
      <GeneratePageInner />
    </Suspense>
  );
}

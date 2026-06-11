"use client";

import { useState, FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { api } from "@/lib/api";
import type { ResearchResponse } from "@/lib/types";

interface ResearchFormProps {
  onSuccess: (data: ResearchResponse, topic: string) => void;
  initialTopic?: string;
}

export default function ResearchForm({ onSuccess, initialTopic = "" }: ResearchFormProps) {
  const [topic, setTopic] = useState(initialTopic);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = topic.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    try {
      const result = await api.generateResearch({ topic: trimmed });
      onSuccess(result, trimmed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div
        style={{
          display: "flex",
          border: "1.5px solid var(--ink)",
          backgroundColor: "var(--cream)",
          overflow: "hidden",
        }}
      >
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. The economics of attention, SpaceX's business model…"
          disabled={loading}
          required
          style={{
            flex: 1,
            padding: "1.125rem 1.5rem",
            fontSize: "1rem",
            color: "var(--ink)",
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
          }}
          aria-label="Research topic"
        />
        <button
          type="submit"
          disabled={loading}
          className="pill-dark"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1.125rem 2rem",
            borderRadius: 0,
            fontWeight: 500,
            fontSize: "0.9375rem",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1,
            flexShrink: 0,
            transition: "opacity 0.15s",
            border: "none",
          }}
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
            <>
              Research <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}
    </form>
  );
}

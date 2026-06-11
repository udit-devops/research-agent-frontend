import Link from "next/link";
import { ArrowRight, BookOpen, Zap, Globe, Archive } from "lucide-react";

const features = [
  { icon: Zap,     title: "Instant synthesis",    body: "Submit any topic and receive a structured, comprehensive report within minutes — not hours." },
  { icon: Globe,   title: "Source-backed findings", body: "Every report is grounded in referenced sources, so you know where the conclusions come from." },
  { icon: Archive, title: "Persistent library",    body: "All your reports are saved and indexed. Return to any research, any time." },
  { icon: BookOpen,title: "Reading-first design",  body: "Reports are formatted for focus — no dashboards, no clutter. Just prose worth reading." },
];

const exampleTopics = [
  "The economics of professional sports",
  "CRISPR gene editing — current state",
  "How central banks manage inflation",
  "The history of the internet's architecture",
  "SpaceX's Starship business case",
];

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "var(--parchment)" }}>

      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "7rem 3rem 5rem",
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
            marginBottom: "2rem",
          }}
        >
          Research platform
        </p>

        {/* Giant display heading */}
        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(4rem, 11vw, 9.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            marginBottom: "3.5rem",
            maxWidth: "18ch",
          }}
        >
          Deep research,{" "}
          <em>delivered.</em>
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "5rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--ink-light)",
              lineHeight: 1.7,
              maxWidth: "38ch",
              flex: "1 1 280px",
            }}
          >
            Scholium generates thorough, source-cited research reports on any topic.
            Ask a question, receive a structured analysis — ready to read, ready to use.
          </p>

          <div style={{ display: "flex", gap: "0.875rem", alignItems: "center", flexWrap: "wrap", flex: "0 0 auto" }}>
            <Link href="/generate" className="pill pill-dark" style={{ fontSize: "0.9375rem", padding: "0.875rem 2rem" }}>
              Start researching <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/reports" className="pill pill-outline" style={{ fontSize: "0.9375rem", padding: "0.875rem 2rem" }}>
              Browse library
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        style={{
          backgroundColor: "var(--cream)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 3rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "2rem",
              marginBottom: "4rem",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--sand)",
                fontWeight: 500,
              }}
            >
              How it works
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--ink)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Built for serious inquiry
            </h2>
          </div>

          <hr className="rule" style={{ marginBottom: "3rem" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0",
            }}
          >
            {features.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                style={{
                  padding: "2.5rem",
                  borderRight: i < features.length - 1 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--parchment)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    borderRadius: "2px",
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: "var(--sand)" }} aria-hidden="true" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "1.25rem",
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--ink-muted)", lineHeight: 1.7 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits + example topics ── */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "6rem 3rem",
          borderBottom: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
        className="flex-col md:grid"
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
            Why Scholium
          </p>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              color: "var(--ink)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}
          >
            Research without the rabbit holes
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--ink-light)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Good research takes time — not because the information is hard to find, but because
            synthesis is hard. Scholium does the synthesis for you: gathering, weighing, and
            presenting what matters, cleanly.
          </p>
          <p style={{ fontSize: "1rem", color: "var(--ink-light)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Use it to prepare for meetings, explore unfamiliar territories, pressure-test ideas,
            or simply satisfy a curiosity that deserves more than a Wikipedia paragraph.
          </p>
          <Link
            href="/generate"
            className="pill pill-dark"
            style={{ fontSize: "0.9375rem", padding: "0.875rem 2rem", display: "inline-flex" }}
          >
            Begin a new report <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

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
            Example topics
          </p>
          <div>
            {exampleTopics.map((example) => (
              <div key={example}>
                <hr className="rule" />
                <Link
                  href={`/generate?topic=${encodeURIComponent(example)}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.25rem 0",
                    color: "var(--ink-light)",
                    fontSize: "0.9375rem",
                    textDecoration: "none",
                    transition: "opacity 0.15s",
                  }}
                  className="hover:opacity-50 group"
                >
                  <span>{example}</span>
                  <ArrowRight
                    className="w-4 h-4 opacity-30 group-hover:opacity-60 transition-opacity shrink-0"
                    style={{ color: "var(--ink)" }}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            ))}
            <hr className="rule" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          backgroundColor: "var(--ink)",
          padding: "7rem 3rem",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "var(--parchment)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              maxWidth: "14ch",
            }}
          >
            Ready to start researching?
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <p style={{ fontSize: "1rem", color: "var(--cream-dark)", lineHeight: 1.6, maxWidth: "36ch" }}>
              Pick a topic. Get a comprehensive report. It takes less than two minutes.
            </p>
            <Link
              href="/generate"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2rem",
                backgroundColor: "var(--parchment)",
                color: "var(--ink)",
                borderRadius: "999px",
                fontSize: "0.9375rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              className="hover:opacity-80"
            >
              Begin a new report <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

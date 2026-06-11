import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--cream)",
        borderTop: "1px solid var(--border)",
        marginTop: "0",
      }}
    >
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem" }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "1.5rem",
            color: "var(--ink)",
            letterSpacing: "-0.01em",
          }}
        >
          Scholium
        </span>

        <nav className="flex items-center gap-6" style={{ color: "var(--ink-muted)", fontSize: "0.875rem" }}>
          <Link href="/generate" className="hover:opacity-60 transition-opacity">
            New Research
          </Link>
          <Link href="/reports" className="hover:opacity-60 transition-opacity">
            Library
          </Link>
        </nav>

        <p style={{ fontSize: "0.8125rem", color: "var(--sand)" }}>
          © {year} Scholium
        </p>
      </div>
    </footer>
  );
}

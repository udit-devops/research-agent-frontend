"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        backgroundColor: "var(--parchment)",
        borderBottom: "1px solid var(--border)",
      }}
      className="sticky top-0 z-50"
    >
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}
        className="flex items-center justify-between h-16"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "1.375rem",
            color: "var(--ink)",
            letterSpacing: "-0.01em",
          }}
        >
          Scholium
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-3">
          <Link
            href="/generate"
            className="pill pill-outline"
            style={
              pathname === "/generate"
                ? { backgroundColor: "var(--ink)", color: "var(--parchment)" }
                : {}
            }
          >
            New Research
          </Link>
          <Link
            href="/reports"
            className="pill pill-dark"
            style={
              pathname === "/reports"
                ? { backgroundColor: "var(--sand)", borderColor: "var(--sand)" }
                : {}
            }
          >
            Library
          </Link>
        </nav>
      </div>
    </header>
  );
}

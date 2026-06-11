
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Scholium Deep Research, Instantly",
  description: "Generate comprehensive research reports on any topic. Powered by AI, written for thinkers.",
  openGraph: {
    title: "Scholium  Deep Research, Instantly",
    description: "Generate comprehensive research reports on any topic.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

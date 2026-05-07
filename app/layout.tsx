import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diecaste OS",
  description: "AI-powered service operations dashboard for student requests."
};

/** Wraps every page with global providers and the dark SaaS shell styles. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

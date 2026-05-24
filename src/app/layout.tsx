import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BIAS. — Daily Fashion Dispatch",
  description: "A daily fashion newsletter. Editorial, witty, unsponsored.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

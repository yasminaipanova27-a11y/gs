import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nomad Student | Feel at home, anywhere",
  description: "Find a home, find your people, and feel at home in your new city.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

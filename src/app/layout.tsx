"use client";

import "./globals.css";
// import { Header } from "./_components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-sans overflow-hidden">
        <div>{children}</div>
      </body>
    </html>
  );
}

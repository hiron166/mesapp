"use client";

import "./globals.css";
import { Header } from "./_components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-sans overflow-hidden">
        <Header />
        <div className="pt-[75px]">{children}</div>
      </body>
    </html>
  );
}

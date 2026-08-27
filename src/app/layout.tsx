"use client";

import "./globals.css";
import { Header } from "./_components/Header";
import {Toaster} from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-sans overflow-hidden">
        <Header />
        <Toaster position="top-center" reverseOrder={false} />
        <div className="pt-[75px]">{children}</div>
      </body>
    </html>
  );
}

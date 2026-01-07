"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import "@/app/globals.css";

export const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };
  const { session, isLoading } = useSupabaseSession();
  return (
    <header className="flex justify-between items-center h-[75px] px-[75px] fixed top-0 left-0 w-full z-50 bg-[#fff]  drop-shadow-lg">
      <Link href="/" className="header-link">
        <Image src="/images/logo.jpg" alt="Logo" width={184} height={40} />
      </Link>
      {!isLoading && (
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/dashboard" className="header-link">
                ダッシュボード
              </Link>
              <Link href="/reservation" className="header-link ml-[30px]">
                ライブ一覧
              </Link>
              <button className="header-link ml-[30px]" onClick={handleLogout}>
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="header-link">
                ログイン
              </Link>
              <Link href="/signup" className="header-link ml-[30px]">
                新規登録
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

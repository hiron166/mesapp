"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import "@/app/globals.css";
import { HeaderLink } from "./HeaderLink";

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
              <HeaderLink
                headerLinkText="ダッシュボード"
                linkHref="/dashboard"
              />
              <HeaderLink
                headerLinkText="ライブ一覧"
                linkHref="/reservation"
                className="ml-[30px]"
              />
              <HeaderLink
                headerLinkText="ログアウト"
                linkHref="/reservation"
                className="ml-[30px]"
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <HeaderLink headerLinkText="ログイン" linkHref="/login" />
              <HeaderLink
                headerLinkText="新規登録"
                linkHref="/signup"
                className="ml-[30px]"
              />
            </>
          )}
        </div>
      )}
    </header>
  );
};

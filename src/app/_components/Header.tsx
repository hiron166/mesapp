"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import "@/app/globals.css";
// import { HeaderLink } from "./HeaderLink";
import { CalendarDays, CalendarPlus, CircleUser, LogOut } from "lucide-react";
import { useState } from "react";

export const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };
  const { session, isLoading } = useSupabaseSession();
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { href: "/lives", label: "ライブ一覧", icon: CalendarDays },
    { href: "/reservations/new", label: "新規ライブ登録", icon: CalendarPlus },
  ];
  if (isLoading || !session) return null;

  return (
    <aside
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`${isOpen ? "w-56" : "w-16"} fixed left-0 top-0 z-50 pt-[45px] px-4 flex h-screen flex-col overflow-hidden border-r bg-white transition-[width] duration-300 `}
    >
      <div className="mb-[64px] h-[33px] overflow-hidden">
        <Image
          src="/images/aside_logo_full.png"
          alt="Logo"
          width={150}
          height={30}
          className="max-w-none"
        />
      </div>
      <nav className="mb-auto flex flex-col gap-[50px] overflow-hidden">
        {menus.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center hover:text-[#DC143C] transition-colors duration-300">
            <Icon size={30} className="shrink-0 mr-2" />
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        ))}
      </nav>
      <div className="flex flex-col gap-[50px] overflow-hidden">
        <div className="flex items-center">
          <a href="/account" className="flex items-center hover:text-[#DC143C] transition-colors duration-300">
            <CircleUser size={30} className="shrink-0 mr-2" />
            <span className="whitespace-nowrap">アカウント名</span>
          </a>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center mb-[70px] hover:text-[#DC143C] transition-colors duration-300"
        >
          <LogOut size={30} className="shrink-0 mr-2" />
          <span className="whitespace-nowrap">ログアウト</span>
        </button>
      </div>
    </aside>
  );
};

"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div>
        <Image
          src="/images/logo.jpg"
          alt="MesApp Logo"
          width={295}
          height={64}
          priority
          className="mb-[45px]"
        />
      </div>
      <h1 className="text-[32px] font-regular text-black tracking-[0.1em] mb-[25px]">
        〜業務管理を感覚的に〜
      </h1>
      <div className="text-[20px] font-regular text-black tracking-[0.03em] ml-auto mr-auto text-center mb-[65px]">
        <p>予約管理・座席管理をもっとわかりやすく、</p>
        <p>感覚的に操作できる業務管理アプリです。</p>
      </div>
      <div className="flex space-x-[35px]">
        <Link href="/login" className="top-page-button">
          ログイン
        </Link>
        <Link href="/signup" className="top-page-button">
          新規登録
        </Link>
      </div>
    </div>
  );
}

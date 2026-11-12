"use client";
import Image from "next/image";
import { TopPageButton } from "./_components/TopPageButton";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div>
        <Image
          src="/images/logo.jpg"
          alt="MesApp Logo"
          width={600}
          height={130}
          priority
          className="mb-[17px]"
        />
      </div>
      <h1 className="text-[50px] font-regular text-black tracking-[0.1em] mb-[30px]">
        〜業務管理を感覚的に〜
      </h1>
      <div className="text-[20px] font-regular text-black tracking-[0.03em] ml-auto mr-auto text-center mb-[55px]">
        <p>
          予約管理・座席管理をもっとわかりやすく、感覚的に操作できる業務管理アプリです。
        </p>
      </div>
      <div className="flex space-x-[35px]">
        <TopPageButton buttonText="ログイン" linkHref="/login" />
        <TopPageButton buttonText="サインアップ" linkHref="/signup" />
      </div>
    </div>
  );
}

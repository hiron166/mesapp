"use client";

import { ReservationList } from "./_components/ReservationList";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
import { useRouteGuard } from "../_hooks/useRouteGuard";
import { LiveInfoRelations } from "../_types/LiveInfoRelations";

type SearchForm = { keyword: string };

export default function ReservationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useRouteGuard();

  // const router = useRouter();
  const [liveInfos, setLiveInfos] = useState<LiveInfoRelations[]>([]);
  const { register, watch } = useForm<SearchForm>({
    defaultValues: {
      keyword: "",
    },
  });
  const keyword = watch("keyword").trim().toLowerCase();
  const digitKeyword = keyword.replace(/[^0-9]/g, ""); // 数字以外の文字を削除

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch("/api/live_infos");
        if (!response.ok) throw new Error();
        setLiveInfos(await response.json());
      } catch (error) {
        console.error("ライブ情報の取得に失敗しました。", error);
        alert("ライブ情報の取得に失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, []);

  const filtered = liveInfos.filter((live) => {
    if (keyword === "") return true;
    const targets = [
      live.day,
      live.liveName,
      ...live.performers.map((p) => p.name),
      ...live.fellowPerformers.map((fp) => fp.name),
    ];
    if (targets.some((target) => target.toLowerCase().includes(keyword)))
      return true; // 数字が含まれている場合はtrueを返す

    if (digitKeyword === "") return false; // 数字が含まれていない場合はfalseを返す
    const [year, month, day] = live.day.split("-");
    const formattedDate = [
      `${year}${month}${day}`,  // 2026-01-01 -> 20260101
      `${year}${Number(month)}${Number(day)}`, // 2026-01-01 -> 202611
    ];
    return formattedDate.some((date) => date.includes(digitKeyword)); // 数字が含まれている場合はtrueを返す
  });

  if (!session) return null;

  return (
    <>
      <div className="mx-[75px]">
        <div>
          <div className="flex justify-between items-start mt-[30px] ">
            <h1 className="text-[40px] mb-[60px]">ライブ一覧</h1>
            <Link
              href="/reservation/new"
              className="bg-[#DC143C] text-white px-4 py-2 rounded-xl hover:bg-[#DC143C]/80 transition-colors duration-300"
            >
              新規ライブ登録
            </Link>
          </div>
        </div>
        <div>
          <input
            type="text"
            {...register("keyword")}
            placeholder="検　索"
            className="w-full h-[30px] mb-[10px] border border-[#cccccc] rounded-xl text-center bg-[#cccccc]/50 "
          />
        </div>
        <ReservationList liveInfos={filtered} isLoading={isLoading} />
      </div>
    </>
  );
}

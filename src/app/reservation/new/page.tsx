"use client";

import { NewReservationForm } from "../_components/NewReservationForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useRouter } from "next/navigation";
import { useRouteGuard } from "@/app/_hooks/useRouteGuard";

import { useForm } from "react-hook-form";

type FormValues = {
  day: string;
  openTime: string;
  liveName: string;
  chargePrice: number;
  ticketQuota: number;
  fellowPerformers: { role: string; name: string }[];
  performers: { role: string; name: string }[];
};

export default function NewReservationPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      day: "",
      openTime: "",
      liveName: "",
      chargePrice: 0,
      ticketQuota: 0,
      fellowPerformers: [
        { role: "カンテ", name: "" },
        { role: "ギター", name: "" },
        { role: "バイオリン", name: "" },
      ],
      performers: [{ role: "", name: "" }],
    },
  });
  const { session } = useRouteGuard();
  const { token } = useSupabaseSession();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    if (!token) {
      alert("認証トークンが必要です");
      return;
    }
    try {
      const response = await fetch("/api/live_infos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          liveInfo: {
            day: data.day,
            openTime: data.openTime,
            liveName: data.liveName,
            chargePrice: data.chargePrice,
            ticketQuota: data.ticketQuota,
          },
          fellowPerformers: data.fellowPerformers,
          performers: data.performers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.status || "ライブ情報の作成に失敗しました");
        return;
      }

      alert("ライブ情報を作成しました");
      router.push("/reservation");
    } catch {
      alert("ライブ情報の作成に失敗しました");
    }
  };

  if (!session) return null;
  return (
    <div>
      <NewReservationForm
        mode="new"
        register={register}
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

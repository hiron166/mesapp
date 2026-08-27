"use client";

import { useState } from "react";
import {
  FellowPerformer,
  Performer,
  NewReservationForm,
} from "../_components/NewReservationForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function NewReservationPage() {
  const { token } = useSupabaseSession();
  const router = useRouter();
  const [day, setDay] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [liveName, setLiveName] = useState("");
  const [chargePrice, setChargePrice] = useState(0);
  const [ticketQuota, setTicketQuota] = useState(0);
  const [fellowPerformers, setFellowPerformers] = useState<FellowPerformer[]>([
    { role: "カンテ", name: "" },
    { role: "ギター", name: "" },
    { role: "バイオリン", name: "" },
  ]);
  const [performers, setPerformers] = useState<Performer[]>([
    { role: "", name: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("認証トークンが必要です");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/live_infos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          liveInfo: {
            day,
            openTime,
            liveName,
            chargePrice,
            ticketQuota,
          },
          fellowPerformers,
          performers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.status || "ライブ情報の作成に失敗しました");
        return;
      }

      toast.success("ライブ情報を作成しました");
      router.push("/reservation");
    } catch {
      toast.error("ライブ情報の作成に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <NewReservationForm
        mode="new"
        day={day}
        setDay={setDay}
        openTime={openTime}
        setOpenTime={setOpenTime}
        liveName={liveName}
        setLiveName={setLiveName}
        chargePrice={chargePrice}
        setChargePrice={setChargePrice}
        ticketQuota={ticketQuota}
        setTicketQuota={setTicketQuota}
        fellowPerformers={fellowPerformers}
        setFellowPerformers={setFellowPerformers}
        performers={performers}
        setPerformers={setPerformers}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

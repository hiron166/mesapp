"use client";

import { useState } from "react";
import { FellowPerformer, Performer, NewReservationForm } from "../_components/NewReservationForm";

export default function NewReservationPage() {
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
  const [performers, setPerformers] = useState<Performer[]>([{ role: "", name: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: 送信処理
    setIsSubmitting(false);
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

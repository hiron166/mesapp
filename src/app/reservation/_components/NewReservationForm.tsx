"use client";

import React from "react";

export interface FellowPerformer {
  role: string;
  name: string;
}

interface NewReservationFormProps {
  mode: "new" | "edit";
  day: number;
  setDay: (day: number) => void;
  openTime: number;
  setOpenTime: (openTime: number) => void;
  liveName: string;
  setLiveName: (liveName: string) => void;
  chargePrice: number;
  setChargePrice: (chargePrice: number) => void;
  ticketQuota: number;
  setTicketQuota: (ticketQuota: number) => void;
  fellowPerformers: FellowPerformer[];
  setFellowPerformers: (fellowPerformers: FellowPerformer[]) => void;
  performers: string;
  setPerformers: (performers: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  isSubmitting: boolean;
}

export const NewReservationForm: React.FC<NewReservationFormProps> = ({
  mode,
  day,
  setDay,
  openTime,
  setOpenTime,
  liveName,
  setLiveName,
  chargePrice,
  setChargePrice,
  ticketQuota,
  setTicketQuota,
  fellowPerformers,
  setFellowPerformers,
  performers,
  setPerformers,
  onSubmit,
  onDelete,
  isSubmitting,
}) => {
  // 指定行の役割（カンテ・ギターなど）を更新する
  const updateRole = (index: number, role: string) => {
    const updated = [...fellowPerformers];
    updated[index] = { ...updated[index], role };
    setFellowPerformers(updated);
  };

  // 指定行の演奏者名を更新する
  const updateName = (index: number, name: string) => {
    const updated = [...fellowPerformers];
    updated[index] = { ...updated[index], name };
    setFellowPerformers(updated);
  };

  // 共演者の行を末尾に1つ追加する
  const addPerformer = () => {
    setFellowPerformers([...fellowPerformers, { role: "", name: "" }]);
  };

  // 指定行の共演者を削除する
  const removePerformer = (index: number) => {
    setFellowPerformers(fellowPerformers.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>ライブ登録</h1>
      <div>
        <div className="">
          <div className="">
            <label htmlFor="day" className="block mb-[10px]">日付</label>
            <input
              type="date"
              id="day"
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              required
              className="w-[200px] h-[50px] border-[2px] rounded-[10px] border-[#CCCCCC]"
            />
          </div>
          <div>
            <label htmlFor="openTime">開場時間</label>
            <input
              type="time"
              id="openTime"
              value={openTime}
              onChange={(e) => setOpenTime(Number(e.target.value))}
              required
              className="w-[200px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px]"
            />
          </div>
          <div>
            <label htmlFor="liveName">企画名</label>
            <input
              type="text"
              id="liveName"
              value={liveName}
              onChange={(e) => setLiveName(e.target.value)}
              required
              className="w-[400px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px]"
            />
          </div>
          <div>
            <label htmlFor="chargePrice">チャージ</label>
            <div className="relative inline-block">
              <input
                type="number"
                id="chargePrice"
                value={chargePrice}
                onChange={(e) => setChargePrice(Number(e.target.value))}
                required
                className="w-[400px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">円</span>
            </div>
          </div>
          <div>
            <label htmlFor="ticketQuota">チケットノルマ</label>
            <div className="relative inline-block">
              <input
                type="number"
                id="ticketQuota"
                value={ticketQuota}
                onChange={(e) => setTicketQuota(Number(e.target.value))}
                required
                className="w-[400px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">名</span>
            </div>
          </div>
          <div>
            <label>共演者</label>
            <div className="flex flex-col gap-2">
              {fellowPerformers.map((performer, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={performer.role}
                    onChange={(e) => updateRole(index, e.target.value)}
                    placeholder="役割"
                    className="w-[150px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] px-3"
                  />
                  <input
                    type="text"
                    value={performer.name}
                    onChange={(e) => updateName(index, e.target.value)}
                    placeholder="名前"
                    className="w-[230px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] px-3"
                  />
                  <button
                    type="button"
                    onClick={() => removePerformer(index)}
                    className="ml-2 text-gray-400 hover:text-red-500 text-xl leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPerformer}
                className="w-[50px] h-[50px] border-[2px] border-[#CCCCCC] rounded-full text-2xl text-gray-500 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
        <button type="submit" disabled={isSubmitting}>
          {mode === "new" ? "登録" : "更新"}
        </button>
      </div>
    </form>
  );
};

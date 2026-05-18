"use client";

import React from "react";

export interface FellowPerformer {
  role: string;
  name: string;
}

export interface Performer {
  role: string;
  name: string;
}

interface NewReservationFormProps {
  mode: "new" | "edit";
  day: string;
  setDay: (day: string) => void;
  openTime: string;
  setOpenTime: (openTime: string) => void;
  liveName: string;
  setLiveName: (liveName: string) => void;
  chargePrice: number;
  setChargePrice: (chargePrice: number) => void;
  ticketQuota: number;
  setTicketQuota: (ticketQuota: number) => void;
  fellowPerformers: FellowPerformer[];
  setFellowPerformers: (fellowPerformers: FellowPerformer[]) => void;
  performers: Performer[];
  setPerformers: (performers: Performer[]) => void;
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
  // 全角数字を半角数字に変換する
  const toHalfWidth = (str: string) =>
    str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));

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

  // 指定行の出演者名を更新する
  const updatePerformerName = (index: number, name: string) => {
    const updated = [...performers];
    updated[index] = { ...updated[index], name };
    setPerformers(updated);
  };

  // 出演者の行を末尾に1つ追加する
  const addPerformerItem = () => {
    setPerformers([...performers, { role: "", name: "" }]);
  };

  // 指定行の出演者を削除する
  const removePerformerItem = (index: number) => {
    setPerformers(performers.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="my-[30px] mx-[75px]">
        <h1 className="text-[40px] mb-[60px]">ライブ登録</h1>
        <div>
          <div className="flex items-center gap-[80px] mb-[40px]">
            <div className="">
              <label htmlFor="day" className="block text-xl">
                日付
              </label>
              <input
                type="date"
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
                className="w-[200px] h-[50px] border-[2px] rounded-[10px] border-[#CCCCCC]  px-[10px]"
              />
            </div>
            <div>
              <label htmlFor="openTime" className="block text-xl">
                開場時間
              </label>
              <input
                type="time"
                id="openTime"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                required
                className="w-[200px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] px-[10px]"
              />
            </div>
            <div>
              <label htmlFor="liveName" className="block text-xl">
                企画名
              </label>
              <input
                type="text"
                id="liveName"
                value={liveName}
                onChange={(e) => setLiveName(e.target.value)}
                required
                className="w-[400px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] px-[10px]"
              />
            </div>
          </div>
          <div className="flex items-start gap-[80px] mb-[40px]">
            <div>
              <label htmlFor="chargePrice" className="block text-xl">
                チャージ
              </label>
              <div className="relative inline-block">
                <input
                  type="text"
                  inputMode="numeric"
                  id="chargePrice"
                  value={chargePrice === 0 ? "" : chargePrice.toLocaleString("ja-JP")}
                  onChange={(e) => {
                    const val = toHalfWidth(e.target.value).replace(/[^0-9]/g, "");
                    setChargePrice(val === "" ? 0 : Number(val));
                  }}
                  required
                  className="w-[200px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] px-[10px]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  円
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="ticketQuota" className="block text-xl">
                チケットノルマ
              </label>
              <div className="relative inline-block">
                <input
                  type="text"
                  inputMode="numeric"
                  id="ticketQuota"
                  value={ticketQuota}
                  onChange={(e) => {
                    const val = toHalfWidth(e.target.value).replace(/[^0-9]/g, "");
                    setTicketQuota(val === "" ? 0 : Number(val));
                  }}
                  required
                  className="w-[200px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] px-[10px]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  名
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="fellowPerformers" className="block text-xl">
                共演者
              </label>
              <div className="grid grid-cols-2 gap-2">
                {fellowPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex items-center w-[300px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] overflow-hidden px-3 gap-1">
                      <input
                        type="text"
                        value={performer.role}
                        onChange={(e) => updateRole(index, e.target.value)}
                        placeholder="役割"
                        className="w-[100px] h-full outline-none"
                      />
                      <span className="text-gray-400 select-none">:</span>
                      <input
                        type="text"
                        value={performer.name}
                        onChange={(e) => updateName(index, e.target.value)}
                        placeholder="名前"
                        className="w-[100px] flex-1 h-full outline-none"
                      />
                    </div>
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
                  className="w-[32px] h-[32px] border-[2px] border-[#CCCCCC] rounded-full text-base text-gray-500 hover:bg-gray-100 self-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="mb-[40px]">
            <label className="block text-xl mb-2">出演者</label>
            <div className="flex flex-wrap gap-2">
              {performers.map((performer, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex items-center w-[180px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] px-2 gap-1">
                    <div className="w-6 h-6 rounded-full border-[2px] border-[#CCCCCC] flex items-center justify-center text-xs text-gray-500 shrink-0">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={performer.name}
                      onChange={(e) => updatePerformerName(index, e.target.value)}
                      placeholder="名前"
                      className="flex-1 w-[100px] h-full outline-none"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removePerformerItem(index)}
                        className="text-gray-400 hover:text-red-500 text-xl leading-none"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addPerformerItem}
                className="w-[32px] h-[32px] border-[2px] border-[#CCCCCC] rounded-full text-base text-gray-500 hover:bg-gray-100 self-center"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" disabled={isSubmitting}>
              {mode === "new" ? "登録" : "更新"}
            </button>
            {mode === "edit" && (
              <button type="button" onClick={onDelete} disabled={isSubmitting}>
                削除
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

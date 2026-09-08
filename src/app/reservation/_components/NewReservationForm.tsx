"use client";

import React, { useRef, useEffect } from "react";
import { ButtonComponent } from "../../_components/Button";
import {
  UseFormRegister,
  // UseFormHandleSubmit,
  Controller,
  Control,
  useFieldArray,
} from "react-hook-form";
import { FormValues } from "@/app/_types/FormValues";

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
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  onSubmit: (e: React.BaseSyntheticEvent) => Promise<void>;
  onDelete?: () => void;
  isSubmitting: boolean;
}

export const NewReservationForm: React.FC<NewReservationFormProps> = ({
  mode,
  register,
  control,
  onSubmit,
  onDelete,
  isSubmitting,
}) => {
  // 共演者の可変配列
  const {
    fields: fellowFields,
    append: appendFellowPerformer,
    remove: removeFellowPerformer,
  } = useFieldArray({
    control,
    name: "fellowPerformers",
  });

  // 出演者の可変配列
  const {
    fields: performerFields,
    append: appendPerformer,
    remove: removePerformer,
  } = useFieldArray({
    control,
    name: "performers",
  });

  // 出演者名のinput要素の参照を保持するための配列
  const performerNameRefs = useRef<(HTMLInputElement | null)[]>([]);
  // 行が増えた直後に追加された行のinputにフォーカスするためのref
  const prevPerformersLength = useRef(performerFields.length);

  //「＋」で出演者の行を追加した時に、追加された行のinputにフォーカスする
  useEffect(() => {
    if (performerFields.length > prevPerformersLength.current) {
      performerNameRefs.current[performerFields.length - 1]?.focus();
    }
    prevPerformersLength.current = performerFields.length;
  }, [performerFields.length]);
  // 全角数字を半角数字に変換する
  const toHalfWidth = (str: string) =>
    str.replace(/[０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0),
    );

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
                disabled={isSubmitting}
                required
                {...register("day")}
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
                disabled={isSubmitting}
                required
                {...register("openTime")}
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
                disabled={isSubmitting}
                required
                {...register("liveName")}
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
                <Controller
                  name="chargePrice"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      inputMode="numeric"
                      id="chargePrice"
                      value={
                        field.value === 0
                          ? ""
                          : field.value.toLocaleString("ja-JP")
                      }
                      onChange={(e) => {
                        const val = toHalfWidth(e.target.value).replace(
                          /[^0-9]/g,
                          "",
                        );
                        field.onChange(val === "" ? 0 : Number(val));
                      }}
                      disabled={isSubmitting}
                      required
                      className="w-[200px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] px-[10px]"
                    />
                  )}
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
                <Controller
                  name="ticketQuota"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      inputMode="numeric"
                      id="ticketQuota"
                      value={
                        field.value === 0 ? "" : field.value.toLocaleString()
                      }
                      onChange={(e) => {
                        const val = toHalfWidth(e.target.value).replace(
                          /[^0-9]/g,
                          "",
                        );
                        field.onChange(val === "" ? 0 : Number(val));
                      }}
                      disabled={isSubmitting}
                      required
                      className="w-[200px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] px-[10px]"
                    />
                  )}
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
                {fellowFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <div className="flex items-center w-[300px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] overflow-hidden px-3 gap-1">
                      <input
                        type="text"
                        {...register(`fellowPerformers.${index}.role`)}
                        disabled={isSubmitting}
                        placeholder="役割"
                        className="w-[100px] h-full outline-none"
                      />
                      <span className="text-gray-400 select-none">:</span>
                      <input
                        type="text"
                        {...register(`fellowPerformers.${index}.name`)}
                        disabled={isSubmitting}
                        placeholder="名前"
                        className="w-[100px] flex-1 h-full outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFellowPerformer(index)}
                      disabled={isSubmitting}
                      className="ml-2 text-gray-400 hover:text-red-500 text-xl leading-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendFellowPerformer({ role: "", name: "" })}
                  disabled={isSubmitting}
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
              {performerFields.map((field, index) => {
                const { ref, ...rest } = register(`performers.${index}.name`);
                return (
                  <div key={field.id} className="flex items-center">
                    <div className="flex items-center w-[180px] h-[50px] border-[2px] border-[#CCCCCC] rounded-[10px] px-2 gap-1">
                      {/* 0x2460=①のUnicode。indexを足すことで①②③...と連番になる */}
                      <span className="shrink-0 select-none text-gray-500">
                        {String.fromCharCode(0x2460 + index)}
                      </span>
                      <input
                        {...rest}
                        ref={(el) => {
                          ref(el);
                          performerNameRefs.current[index] = el;
                        }}
                        type="text"
                        placeholder="名前"
                        disabled={isSubmitting}
                        className="flex-1 w-[100px] h-full outline-none"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removePerformer(index)}
                          disabled={isSubmitting}
                          className="text-gray-400 hover:text-red-500 text-xl leading-none"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() => appendPerformer({ role: "", name: "" })}
                disabled={isSubmitting}
                className="w-[32px] h-[32px] border-[2px] border-[#CCCCCC] rounded-full text-base text-gray-500 hover:bg-gray-100 self-center"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex gap-4 max-w-[200px] h-[50px] ml-auto">
            <ButtonComponent
              isSubmitting={isSubmitting}
              submittingText={mode === "new" ? "登録中..." : "更新中..."}
              defaultText={mode === "new" ? "登録" : "更新"}
              wrapperClassName="flex gap-4 w-[200px] h-[50px] ml-auto"
              buttonElementProps={{
                type: "submit",
                disabled: isSubmitting,
              }}
            />
            {mode === "edit" && (
              <button
                type="button"
                onClick={onDelete}
                disabled={isSubmitting}
                className="w-full text-white bg-[#143fdc] hover:bg-[#143fdc]/60 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300"
              >
                削除
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

"use client";

import { supabase } from "@/utils/supabase";
// import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormData } from "../_types/SignupFormData";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    if (data.password !== data.passwordConfirm) {
      alert("パスワードが一致しません");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });
    if (error) {
      alert("登録に失敗しました");
    } else {
      reset();
      alert("確認メールを送信しました。");
    }
  };

  const watchPassword = watch("password");

  return (
    <div className="flex items-center justify-center h-screen font-sans bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[600px]"
      >
        <h1 className="flex justify-center text-[36px] mb-[30px] text-[#DC143C]">
          Signup
        </h1>
        <div>
          <label
            htmlFor="email"
            className="block mb-[7px] text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-[7px]"
            placeholder="name@company.com"
            required
            {...register("email", {
              required: "メールアドレスは必須です",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "有効なメールアドレスを入力してください",
              },
            })}
            disabled={isSubmitting}
          />
          <div className="text-sm text-red-600  mb-[30px]">
            {errors.email?.message}
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-[7px]"
            required
            {...register("password", {
              required: "パスワードは必須です",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上で入力してください。",
              },
            })}
            disabled={isSubmitting}
          />
          <div className="text-sm text-red-600 mb-[30px]">
            {errors.password?.message}
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード（確認用）
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-[7px]"
            required
            {...register("passwordConfirm", {
              validate: (value) =>
                value === watchPassword || "パスワードが一致しません",
            })}
            disabled={isSubmitting}
          />
          <div className="text-sm text-red-600 mb-[40px]">
            {errors.passwordConfirm?.message}
          </div>
        </div>

        <div className="flex justify-center max-w-[300px] mx-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-[#DC143C] hover:bg-[#DC143C]/60 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isSubmitting ? "新規登録中..." : "新規登録"}
          </button>
        </div>
      </form>
    </div>
  );
}

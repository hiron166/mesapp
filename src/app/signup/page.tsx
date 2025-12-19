"use client";

import { supabase } from "@/utils/supabase";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupLoginFormData } from "../_types/SignupLoginFormData";
import InputMail from "../_components/InputMail";
import InputPassConf from "../_components/InputPassConf";
import InputPass from "../_components/InputPass";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupLoginFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<SignupLoginFormData> = async (data) => {
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

  return (
    <div className="flex items-center justify-center h-screen font-sans bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[600px]"
      >
        <h1 className="flex justify-center text-[36px] mb-[30px] text-[#DC143C]">
          Signup
        </h1>

        <InputMail register={register} errors={errors} />
        <InputPass register={register} errors={errors} />
        <InputPassConf
          register={register}
          errors={errors}
          passwordConfirm={watch}
        />

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

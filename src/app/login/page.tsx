"use client";

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupLoginFormData } from "../_types/SignupLoginFormData";
import InputMail from "../_components/InputMail";
import InputPass from "../_components/InputPass";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupLoginFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<SignupLoginFormData> = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert("ログインに失敗しました");
    } else {
      reset();
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-sans bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[600px]"
      >
        <h1 className="flex justify-center text-[36px] mb-[30px] text-[#DC143C]">
          Login
        </h1>
        <InputMail register={register} errors={errors} />
        <InputPass register={register} errors={errors} />
        <div className="flex justify-center max-w-[300px] mx-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-[#DC143C] hover:bg-[#DC143C]/60 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isSubmitting ? "ログイン中..." : "ログイン"}
          </button>
        </div>
      </form>
    </div>
  );
}

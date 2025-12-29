"use client";

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthFormData } from "../_types/AuthFormData";
import { InputComponent } from "../_components/Input";
import { ButtonComponent } from "../_components/Button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
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
        <InputComponent<AuthFormData>
          {...register}
          name="email"
          title="メールアドレス"
          placeholder="name@company.com"
          errorMessage={errors.email?.message as string}
          inputElementProps={{
            type: "email",
            ...register("email", {
              required: "メールアドレスは必須です",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "有効なメールアドレスを入力してください",
              },
            }),
          }}
        />
        <InputComponent<AuthFormData>
          {...register}
          name="password"
          title="パスワード"
          placeholder="••••••••"
          errorMessage={errors.password?.message as string}
          inputElementProps={{
            type: "password",
            ...register("password", {
              required: "パスワードは必須です",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上で入力してください。",
              },
            }),
          }}
        />
        <ButtonComponent
          buttonElementProps={{
            type: "submit",
            disabled: isSubmitting,
          }}
          isSubmitting={isSubmitting}
          submittingText="ログイン中..."
          defaultText="ログイン"
        />
        <div className="text-center">
          <Link
            href="/reset-password"
            className="inline-block underline text-sm font-medium text-gray-900 hover:text-[#DC143C] transition-colors duration-300"
          >
            パスワードを忘れた方はこちら
          </Link>
        </div>
      </form>
    </div>
  );
}

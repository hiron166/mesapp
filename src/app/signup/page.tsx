"use client";

import { supabase } from "@/utils/supabase";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthFormData } from "../_types/AuthFormData";
import { InputComponent } from "../_components/Input";
import { ButtonComponent } from "../_components/Button";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
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

        <InputComponent<AuthFormData>
          {...register}
          name="email"
          title="メールアドレス"
          placeholder="name@company.com"
          errorMessage={errors.email?.message as string}
          inputElementProps={{
            type: "email",
            disabled: isSubmitting,
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
            disabled: isSubmitting,
            ...register("password", {
              required: "パスワードは必須です",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上で入力してください。",
              },
            }),
          }}
        />
        <InputComponent<AuthFormData>
          {...register}
          name="passwordConfirm"
          title="パスワード確認"
          placeholder="••••••••"
          errorMessage={errors.passwordConfirm?.message as string}
          inputElementProps={{
            type: "password",
            disabled: isSubmitting,
            ...register("passwordConfirm", {
              validate: (value) =>
                value === watchPassword || "パスワードが一致しません",
            }),
          }}
          passwordConfirm={watch}
        />
        <ButtonComponent
          buttonElementProps={{
            type: "submit",
            disabled: isSubmitting,
          }}
          isSubmitting={isSubmitting}
          submittingText="新規登録中..."
          defaultText="新規登録"
        />
      </form>
    </div>
  );
}

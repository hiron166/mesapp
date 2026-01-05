"use client";

import { supabase } from "@/utils/supabase";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthFormData } from "../_types/AuthFormData";
import { InputComponent } from "../_components/Input";
import { ButtonComponent } from "../_components/Button";


export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    if (data.password !== data.passwordConfirm) {
      alert("パスワードが一致しません");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `http://localhost:3000/reset_password/confirm`,
    });
    if (error) {
      alert("送信に失敗しました");
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
          パスワードを忘れた場合
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

        <ButtonComponent
          buttonElementProps={{
            type: "submit",
            disabled: isSubmitting,
          }}
          isSubmitting={isSubmitting}
          submittingText="送信中..."
          defaultText="送信"
        />
      </form>
    </div>
  );
}

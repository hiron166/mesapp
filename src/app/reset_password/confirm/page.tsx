"use client";

import { supabase } from "@/utils/supabase";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonComponent } from "@/app/_components/Button";
import { InputComponent } from "@/app/_components/Input";
import { AuthFormData } from "@/app/_types/AuthFormData";
import { useRouter } from "next/navigation";

export default function ResetPasswordConfirm() {
  const router = useRouter();
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

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });
    if (error) {
      alert("パスワードの再設定に失敗しました");
    } else {
      reset();
      alert("パスワードは正常に再設定されました。");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
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
          パスワードの再設定
        </h1>

        <InputComponent<AuthFormData>
          {...register}
          name="password"
          title="新しいパスワード"
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
          title="確認用パスワード"
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
          submittingText="パスワードを再設定中..."
          defaultText="パスワードを再設定"
        />
      </form>
    </div>
  );
}

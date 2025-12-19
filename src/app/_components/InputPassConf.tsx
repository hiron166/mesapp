import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { SignupLoginFormData } from "../_types/SignupLoginFormData";

type Props = {
  register: UseFormRegister<SignupLoginFormData>;
  errors: FieldErrors<SignupLoginFormData>;
  passwordConfirm: UseFormWatch<SignupLoginFormData>;
};

export default function InputPassConf({
  register,
  errors,
  passwordConfirm,
}: Props) {
  const watchPassword = passwordConfirm("password");
  return (
    <>
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
          // disabled={isSubmitting}
        />
        <div className="text-sm text-red-600 mb-[40px]">
          {errors.passwordConfirm?.message}
        </div>
      </div>
    </>
  );
}

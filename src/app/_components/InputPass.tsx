import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SignupLoginFormData } from "../_types/SignupLoginFormData";

type Props = {
  register: UseFormRegister<SignupLoginFormData>;
  errors: FieldErrors<SignupLoginFormData>;
};

export default function InputPass({ register, errors }: Props) {
  return (
    <>
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
          // disabled={isSubmitting}
        />
        <div className="text-sm text-red-600 mb-[30px]">
          {errors.password?.message}
        </div>
      </div>
    </>
  );
}

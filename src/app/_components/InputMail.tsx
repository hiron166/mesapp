import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SignupLoginFormData } from "../_types/SignupLoginFormData";

type Props = {
  register: UseFormRegister<SignupLoginFormData>;
  errors: FieldErrors<SignupLoginFormData>;
};

export default function InputMail({ register, errors }: Props) {
  return (
    <>
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
          // disabled={isSubmitting}
        />
        <div className="text-sm text-red-600  mb-[30px]">
          {errors.email?.message}
        </div>
      </div>
    </>
  );
}

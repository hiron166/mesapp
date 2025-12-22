"use client";

import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { UseFormWatch } from "react-hook-form";
import { AuthFormData } from "../_types/AuthFormData";

type InputElementProps = React.ComponentProps<"input">;
type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  title: string;
  placeholder: string;
  errorMessage?: string;
  rules?: RegisterOptions<T, Path<T>>;
  inputElementProps?: InputElementProps;
  passwordConfirm?: UseFormWatch<AuthFormData>;
  message?: string;
};

export const InputComponent = <T extends FieldValues>({
  register,
  name,
  title,
  placeholder,
  errorMessage,
  rules,
  inputElementProps,
}: Props<T>) => {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {title}
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-[7px]"
          {...inputElementProps}
          placeholder={placeholder}
          {...register(name, rules)}
          {...inputElementProps}
        />
        <div className="text-sm text-red-600 mb-[30px]">{errorMessage}</div>
      </div>
    </div>
  );
};

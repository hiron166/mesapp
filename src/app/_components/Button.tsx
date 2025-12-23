"use client";

import React from "react";

type ButtonElementProps = React.ComponentProps<"button">;
type SubmitProps = {
  buttonElementProps?: ButtonElementProps;
  isSubmitting: boolean;
  submittingText: string;
  defaultText: string;
};

export const ButtonComponent = ({
  isSubmitting,
  submittingText,
  defaultText,
  buttonElementProps
}: SubmitProps) => {
  return (
    <div className="flex justify-center max-w-[300px] mx-auto">
      <button
        {...buttonElementProps}
        className="w-full text-white bg-[#DC143C] hover:bg-[#DC143C]/60 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {isSubmitting ? submittingText : defaultText}
      </button>
    </div>
  );
};

"use client";

import Link from "next/link";
import React from "react";

type TopPageButtonProps = {
  buttonText: string;
  linkHref: string;
};

export const TopPageButton = ({ buttonText, linkHref }: TopPageButtonProps) => {
  return (
    <div>
      <Link
        href={linkHref}
        className="w-[150px] h-[50px] flex items-center justify-center text-white bg-[#DC143C] hover:bg-[#DC143C]/60 font-medium text-base rounded-lg transition-colors duration-300"
      >
        {buttonText}
      </Link>
    </div>
  );
};

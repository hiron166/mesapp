"use client";

import Link from "next/link";
import React from "react";

type HeaderLinkProps = {
  headerLinkText: string;
  linkHref: string;
  onClick?: () => void;
  className?: string;
};

export const HeaderLink = ({
  headerLinkText,
  linkHref,
  onClick,
  className = "",
}: HeaderLinkProps) => {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`font-medium
  text-[#DC143C]
  hover:text-[#DC143C]/50
  transition-colors duration-300
  underline ${className}`}
      >
        ログアウト
      </button>
    );
  }
  return (
    <div>
      <Link
        href={linkHref}
        className={`font-medium
  text-[#DC143C]
  hover:text-[#DC143C]/50
  transition-colors duration-300
  underline ${className}`}
      >
        {headerLinkText}
      </Link>
    </div>
  );
};

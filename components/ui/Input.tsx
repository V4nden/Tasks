"use client";
import React, { HTMLProps } from "react";
import { twMerge } from "tw-merge";

interface Props extends HTMLProps<HTMLInputElement> {
  className?: string;
}

const Input = (props: Props) => {
  return (
    <input
      {...props}
      className={twMerge(
        "bg-zinc-950 border border-zinc-800 text-zinc-200 outline-none rounded-xl w-full p-2 " +
          props.className
      )}
    />
  );
};

export default Input;

"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaChartPie, FaCog, FaList, FaPlus, FaTag } from "react-icons/fa";

type Props = {};

const NavBar = (props: Props) => {
  const router = useRouter();
  return (
    <div className="fixed z-50 bg-zinc-950/75 backdrop-blur-sm border-zinc-800 bottom-0 left-0 flex items-center justify-around w-full p-4 border-t-2 text-zinc-50">
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        <FaList size={24} />
      </button>
      <button
        onClick={() => {
          router.push("/tags");
        }}
      >
        <FaTag size={24} />
      </button>
      <button
        onClick={() => {
          router.push("/stats");
        }}
      >
        <FaChartPie size={24} />
      </button>
      <button
        onClick={() => {
          router.push("/settings");
        }}
      >
        <FaCog size={24} />
      </button>
    </div>
  );
};

export default NavBar;

"use client";
import React, { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import * as Fa from "react-icons/fa";
import Input from "./Input";
import iconFromId from "../../utils/iconFromId";
type Props = {
  onSelected: Function;
};

const IconSelector = (props: Props) => {
  const [selected, setSelected] = useState<string>("FaInfo");
  const [visible, setVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState("");
  useEffect(() => {}, []);

  return (
    <>
      <button
        className="p-2 border border-zinc-800 rounded-xl"
        onClick={() => {
          setVisible((prev) => !prev);
        }}
      >
        {iconFromId(selected)}
      </button>
      {visible && (
        <div className="backdrop-blur-md fixed w-full min-h-screen max-h-screen top-0 left-0 gap-4 flex flex-col p-4 z-20">
          <div className="text-zinc-100 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Select icon</h1>
            <button
              onClick={() => {
                setVisible((prev) => !prev);
              }}
            >
              <FaX />
            </button>
          </div>
          <Input
            value={filter}
            onChange={(e) => {
              setFilter(e.currentTarget.value);
            }}
            placeholder="Search icons"
          />
          <div className="flex flex-wrap gap-8 items-center justify-center overflow-y-scroll">
            {Object.entries(Fa)
              .filter(([key]) =>
                key.toLowerCase().includes(filter.toLowerCase())
              )
              .map(([key, IconComponent]) => {
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelected(key);
                      props.onSelected(key);
                      setVisible((prev) => !prev);
                    }}
                  >
                    <IconComponent key={key} size={32} />
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default IconSelector;

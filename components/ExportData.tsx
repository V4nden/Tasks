import React, { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

type Props = {};

const ExportData = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  let data = {
    TasksStore:
      typeof window !== "undefined"
        ? JSON.parse(String(window.localStorage.getItem("TasksStore")))
        : undefined,
    HistoryStore:
      typeof window !== "undefined"
        ? JSON.parse(String(window.localStorage.getItem("HistoryStore")))
        : undefined,
    TagsStore:
      typeof window !== "undefined"
        ? JSON.parse(String(window.localStorage.getItem("TagsStore")))
        : undefined,
  };

  return (
    <>
      <button
        className="p-2 border border-zinc-800 rounded-xl"
        onClick={() => {
          setVisible((prev) => !prev);
        }}
      >
        ExportData
      </button>
      {visible && (
        <div className="backdrop-blur-md fixed w-full min-h-screen max-h-screen top-0 left-0 gap-2 flex flex-col p-4 z-20">
          <div className="text-zinc-100 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Your app data</h1>
            <button
              onClick={() => {
                setVisible((prev) => !prev);
              }}
            >
              <FaX />
            </button>
          </div>
          <textarea
            className="bg-transparent h-full flex-grow resize-none border-0 outline-none"
            value={btoa(encodeURIComponent(JSON.stringify(data)))}
          ></textarea>
        </div>
      )}
    </>
  );
};

export default ExportData;

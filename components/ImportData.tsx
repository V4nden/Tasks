import History from "@/utils/store/History";
import Tags from "@/utils/store/Tags";
import Tasks from "@/utils/store/Tasks";
import React, { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

type Props = {};

const ImportData = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState("");

  return (
    <>
      <button
        className="p-2 border border-zinc-800 rounded-lg"
        onClick={() => {
          setVisible((prev) => !prev);
        }}
      >
        Import data
      </button>
      {visible && (
        <div className="backdrop-blur-md fixed w-full min-h-screen max-h-screen top-0 left-0 gap-2 flex flex-col p-4 z-20">
          <div className="text-zinc-100 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Import app data</h1>
            <button
              onClick={() => {
                setVisible((prev) => !prev);
              }}
            >
              <FaX />
            </button>
          </div>
          <textarea
            value={data}
            onChange={(e) => setData(e.currentTarget.value)}
            className="bg-transparent h-full flex-grow resize-none border-0 outline-none"
          ></textarea>
          <button
            onClick={(e) => {
              const parsed = JSON.parse(decodeURIComponent(atob(data)));
              History.fromImported(parsed);
              Tasks.fromImported(parsed);
              Tags.fromImported(parsed);
            }}
            className="p-2 border border-zinc-800 w-full mb-16 rounded-lg"
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default ImportData;

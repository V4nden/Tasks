"use client";
import SwipeContainer from "@/components/SwipeContainer";
import Task from "@/components/Task/Task";
import Tasks from "@/utils/store/Tasks";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaAlignLeft, FaArrowLeft, FaPlus } from "react-icons/fa";
import { FaCircleLeft, FaCircleRight, FaLeftLong } from "react-icons/fa6";
import uuid4 from "uuid4";

type Props = {};

const animations = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const page = observer((props: Props) => {
  useEffect(() => {
    console.log(Tasks.tasks);
  }, []);
  const router = useRouter();
  return (
    <main className="min-h-screen mb-14">
      <SwipeContainer className="min-h-screen" containerClassName="p-4">
        {[
          "Scheduled",
          <div
            key={"scheduled"}
            className="flex-col gap-2 overflow-y-scrol flex"
          >
            {Tasks.tasks
              .slice()
              .filter((el) => el.type == "scheduled")
              .sort(
                (a, b) =>
                  //@ts-ignore
                  parseInt(a.time.split(":")[0]) * 60 +
                  //@ts-ignore
                  parseInt(a.time.split(":")[1]) -
                  //@ts-ignore
                  (parseInt(b.time.split(":")[0]) * 60 +
                    //@ts-ignore
                    parseInt(b.time.split(":")[1]))
              )
              .map((task) => (
                <Task {...task} key={task.id} />
              ))}
          </div>,
        ]}
        {[
          "Uncheduled",
          <div
            key={"uncheduled"}
            className="flex-col gap-2 overflow-y-scrol flex"
          >
            {Tasks.tasks
              .slice()
              .filter((el) => el.type == "unscheduled")
              .sort((a, b) => a.priority - b.priority)
              .map((task) => (
                <Task {...task} key={task.id} />
              ))}
          </div>,
        ]}
        {[
          "Onetime",
          <div key={"onetime"} className="flex-col gap-2 overflow-y-scrol flex">
            {Tasks.tasks
              .slice()
              .filter((el) => el.type == "onetime")
              .sort((a, b) => a.priority - b.priority)
              .map((task) => (
                <Task {...task} key={task.id} />
              ))}
          </div>,
        ]}
      </SwipeContainer>

      <button
        onClick={(e) => {
          router.replace("/task?id=" + uuid4() + "&type=scheduled");
        }}
        className="p-4 flex items-center justify-center fixed bottom-16 right-0 m-4 rounded-full bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 z-20"
      >
        <FaPlus fill="#fff" size={24}></FaPlus>
      </button>
    </main>
  );
});

export default page;

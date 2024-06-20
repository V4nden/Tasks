"use client";
import Task from "@/widgets/Task/Task";
import Tasks from "@/shared/utils/store/Tasks";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaAlignLeft, FaArrowLeft, FaPlus } from "react-icons/fa";
import { FaCircleLeft, FaCircleRight, FaLeftLong } from "react-icons/fa6";

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
  const [start, setStart] = useState(0);
  const pages = ["Scheduled", "To-do"];
  const router = useRouter();
  const [page, setPage] = useState(0);
  return (
    <main
      className="min-h-screen p-4 mb-14 mt-10"
      onTouchStart={(e) => {
        setStart(e.touches[0].clientX);
      }}
      onTouchEnd={(e) => {
        if (
          start - window.screen.availWidth / 4 >=
          e.changedTouches[0].clientX
        ) {
          setPage(page + 1 <= pages.length - 1 ? page + 1 : page);
        }
        if (
          start + window.screen.availWidth / 4 <=
          e.changedTouches[0].clientX
        ) {
          setPage(page - 1 >= 0 ? page - 1 : page);
        }
        setStart(0);
      }}
    >
      <div className="border-b fixed top-0 left-0 border-zinc-800 text-zinc-100 w-full flex items-center bg-zinc-950 z-10 justify-center p-2">
        <h1 className="font-bold text-xl">{pages[page]}</h1>
      </div>
      <AnimatePresence mode="wait">
        {page == 0 && (
          <motion.div
            key={"scheduled"}
            {...animations}
            transition={{
              ease: [0.2, 1, 0.2, 1],
              duration: 0.2,
              staggerChildren: 0.5,
            }}
            className="flex-col gap-2 overflow-y-scrol flex"
          >
            {Tasks.tasks
              .slice()
              .filter((el) => el.time)
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
          </motion.div>
        )}
        {page == 1 && (
          <motion.div
            key={"todo"}
            {...animations}
            className="flex-col gap-2 overflow-y-scrol flex"
          >
            {Tasks.tasks
              .slice()
              .filter((el) => !el.time)
              .sort((a, b) => a.priority - b.priority)
              .map((task) => (
                <Task {...task} key={task.id} />
              ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={(e) => {
          if (page == 0) {
            router.replace("/task");
          }
          if (page == 1) {
            router.replace("/task");
          }
        }}
        className="p-4 flex items-center justify-center fixed bottom-16 right-0 m-4 rounded-full bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 z-20"
      >
        <FaPlus fill="#fff" size={24}></FaPlus>
      </button>
    </main>
  );
});

export default page;

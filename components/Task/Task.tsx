import Tasks, { ITask } from "@/utils/store/Tasks";
import React, { useState } from "react";
import Tag from "../ui/Tag";
import * as Fa from "react-icons/fa";
import moment from "moment";
import { FaX } from "react-icons/fa6";
import History from "@/utils/store/History";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Tags from "@/utils/store/Tags";
import TaskActions from "./TaskActions";

interface Props extends ITask {}

const Task = (props: Props) => {
  const diff = () => {
    if (props.time) {
      const now = moment();
      now.set("hour", parseInt(props.time.split(":")[0]));
      now.set("minute", parseInt(props.time.split(":")[1]));
      now.set("second", 0);
      return now.diff(moment(), "minutes");
    } else {
      return false;
    }
  };
  //@ts-ignore
  const Icon = Fa[props.icon];
  const [pressed, setPressed] = useState(0);
  const [actionsVisible, setActionsVisible] = useState(false);

  return (
    <motion.div
      key={props.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`border rounded-xl p-4 border-zinc-800 flex select-none relative flex-col gap-2 justify-center transition-all ease-out`}
      onTouchStart={(e) => {
        setPressed(Date.now());
      }}
      onTouchEnd={(e) => {
        if (!actionsVisible && pressed < Date.now() - 500) {
          navigator.vibrate(100);
          setActionsVisible(!actionsVisible);
        }
      }}
    >
      <div className="flex items-center gap-2 flex-wrap relative">
        <Icon fill="#fff" size={14} />
        <div className="text-zinc-100 font-bold text-xl">{props.name}</div>
        {typeof diff() == "number" && (
          <div
            style={{
              backgroundColor: `${
                //@ts-ignore
                diff() > 0 ? (diff() > 60 ? "#525252" : "#06b6d4") : "#22c55e"
              }`,
            }}
            className="text-zinc-100 font-bold text-sm flex gap-1 items-center justify-center border border-zinc-800 w-fit p-0.5 px-1 rounded-xl"
          >
            <Fa.FaClock />
            {props.time}
          </div>
        )}
        <div
          style={{
            backgroundColor: `${
              props.priority > 33
                ? props.priority > 66
                  ? "#ea580c"
                  : "#f59e0b"
                : "#a8a29e"
            }`,
          }}
          className="text-zinc-100 font-bold text-sm flex gap-1 items-center justify-center border border-zinc-800 w-fit p-0.5 px-1 rounded-xl"
        >
          <Fa.FaExclamationCircle />
          {props.priority}%
        </div>
        {props.tags.map((tag, index) => (
          <Tag tag={Tags.tagById(tag)} key={index} />
        ))}
      </div>

      {props.description && (
        <p className="text-zinc-300">{props.description}</p>
      )}

      <TaskActions
        task={props}
        setVisible={setActionsVisible}
        visible={actionsVisible}
      />
      <AnimatePresence mode="wait">
        {History.isCompleted({ ...props }, moment()) && (
          <motion.div
            key={"completionMark"}
            initial={{ height: 0, top: "50%", opacity: 0 }}
            animate={{ height: "100%", top: 0, opacity: 1 }}
            transition={{ ease: [0.5, 1, 0, 1], duration: 1 }}
            exit={{ height: 0, top: "50%", opacity: 0 }}
            style={{
              backgroundColor: props.color,
            }}
            className="-z-10 absolute w-[10px] top-0 right-0 h-full rounded-r-xl"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Task;

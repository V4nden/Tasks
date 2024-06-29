import { ITask } from "@/utils/store/Tasks";
import React, { useEffect, useState } from "react";
import Tag from "../ui/Tag";
import * as Fa from "react-icons/fa";
import moment from "moment";
import History from "@/utils/store/History";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Tags from "@/utils/store/Tags";
import TaskActions from "./TaskActions";
import { twMerge } from "tw-merge";
import useSwipe from "@/utils/useSwipe";

interface Props extends ITask {
  className?: string;
}

const Task = (props: Props) => {
  const diff = () => {
    if (props.type.type == "scheduled") {
      const now = moment();
      now.set("hour", parseInt(props.type.time.split(":")[0]));
      now.set("minute", parseInt(props.type.time.split(":")[1]));
      now.set("second", 0);
      return now.diff(moment(), "minutes");
    } else {
      return false;
    }
  };
  const animate = useAnimation();

  //@ts-ignore
  const Icon = Fa[props.icon];
  const [pressed, setPressed] = useState(0);
  const [actionsVisible, setActionsVisible] = useState(false);
  const ref = React.createRef<HTMLDivElement>();
  const { est, my } = useSwipe(ref);
  useEffect(() => {
    if (!actionsVisible && est > 500 && Math.abs(my) < 40) {
      navigator.vibrate(100);
      setActionsVisible(!actionsVisible);
    }
  }, [est]);

  return (
    <motion.div
      ref={ref}
      key={props.id}
      animate={animate}
      layout="position"
      transition={{ duration: 0.3, ease: [0, 1, 0, 1] }}
      className={twMerge(
        `border rounded-xl p-4 overflow-hidden border-zinc-800 flex select-none relative flex-col gap-2 justify-center transition-all ease-out ${
          props.className && props.className
        }`
      )}
    >
      <div className="flex items-center gap-2 flex-wrap relative">
        <Icon fill="#fff" size={14} />
        <div className="text-zinc-100 font-bold text-xl">{props.name}</div>
        {props.type.type == "scheduled" && (
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
            {props.type.time}
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
        animate={animate}
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

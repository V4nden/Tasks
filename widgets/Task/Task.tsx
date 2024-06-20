import Tasks, { ITask } from "@/shared/utils/store/Tasks";
import React, { createRef, useEffect, useRef, useState } from "react";
import Tag from "../../shared/ui/Tag";
import * as Fa from "react-icons/fa";
import moment from "moment";
import { FaX } from "react-icons/fa6";
import History from "@/shared/utils/store/History";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Tags from "@/shared/utils/store/Tags";
import TaskActions from "../../features/Task/TaskActions";
import TaskInfo from "@/features/Task/TaskInfo";
import TaskDescription from "@/features/Task/TaskDescription";
import useSwipe from "@/shared/utils/useSwipe";

interface Props extends ITask {}

const Task = (props: Props) => {
  //! idk maybe framer doesn't support modern useref
  //! typing but currently i just cant figure out why
  //! this isn't work correctly

  //@ts-ignore
  const ref = useRef<HTMLDivElement>();
  const { touchEST } = useSwipe(ref.current);
  const [actionsVisible, setActionsVisible] = useState(false);

  useEffect(() => {
    !actionsVisible && touchEST > 500 && setActionsVisible(true);
  }, [touchEST]);

  return (
    <motion.div
      //@ts-ignore
      ref={ref}
      key={props.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`border rounded-xl p-4 border-zinc-800 flex select-none relative flex-col gap-2 justify-center transition-all ease-out`}
    >
      <TaskInfo {...props} />
      <TaskDescription description={props.description} />
      <AnimatePresence mode="wait">
        {actionsVisible && (
          <TaskActions
            key={"actions"}
            task={props}
            setVisible={setActionsVisible}
          />
        )}

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

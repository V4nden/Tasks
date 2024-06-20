import History from "@/shared/utils/store/History";
import { useRouter } from "next/navigation";
import Tasks, { ITask } from "@/shared/utils/store/Tasks";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { Moment } from "moment";
import React, { Dispatch, SetStateAction } from "react";
import { FaX } from "react-icons/fa6";
import * as Fa from "react-icons/fa";

type Props = {
  task: ITask;
  dates: Moment[] | null;
  selectedDate: number;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const TaskActionButtons = observer((props: Props) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      key={"actionButtons"}
      className="flex w-full items-center justify-around"
    >
      {props.dates &&
      History.isCompleted(props.task, props.dates[props.selectedDate]) ? (
        <button
          className="rounded-full p-4 bg-black/50"
          onTouchEnd={(e) => {
            History.revertTask(props.task, props.dates[props.selectedDate]);
            props.setVisible(false);
          }}
        >
          <Fa.FaUndo size={18} />
        </button>
      ) : (
        props.dates && (
          <button
            onTouchEnd={(e) => {
              History.completeTask(props.task, props.dates[props.selectedDate]);
              props.setVisible(false);
            }}
            className="rounded-full p-4 bg-black/50"
          >
            <Fa.FaCheck size={18} />
          </button>
        )
      )}

      <button
        className="rounded-full p-4 bg-black/50"
        onTouchEnd={(e) => {
          router.push("/task/edit?id=" + props.task.id);
        }}
      >
        <Fa.FaPen size={18} />
      </button>
      <button
        className="rounded-full p-4 bg-black/50"
        onTouchEnd={(e) => {
          Tasks.deleteTask(props.task);
          props.setVisible(false);
        }}
      >
        <Fa.FaTrash size={18} />
      </button>
      <button
        className="rounded-full p-4 bg-black/50"
        onTouchEnd={(e) => props.setVisible(false)}
      >
        <FaX size={18} />
      </button>
    </motion.div>
  );
});

export default TaskActionButtons;

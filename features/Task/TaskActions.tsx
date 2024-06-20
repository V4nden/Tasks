import History from "@/shared/utils/store/History";
import Tasks, { ITask } from "@/shared/utils/store/Tasks";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { observer } from "mobx-react-lite";
import moment, { Moment } from "moment";
import * as Fa from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaX } from "react-icons/fa6";
import useSwipe from "@/shared/utils/useSwipe";

type Props = { task: ITask; setVisible: Function };

const TaskActions = observer((props: Props) => {
  const router = useRouter();
  const [dates, setDates] = useState<Moment[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(8);

  const [action, setAction] = useState(0);
  const animation = useAnimation();

  const changeDate = (how: number) => {
    if (!dates) return;
    animation.start({ x: -how * 30, opacity: 0 }).then(() => {
      animation.set({ x: how * 30 });
      setSelectedDate(
        selectedDate + how < 0 || selectedDate + how > dates.length - 1
          ? selectedDate
          : selectedDate + how
      );
      animation.start({ x: 0, opacity: 1 });
    });
  };
  const ref = useRef();
  const { scrollY } = useSwipe(ref.current);

  useEffect(() => {
    if (scrollY > 60) {
      setAction(action + 1 > 1 ? 1 : action + 1);
    } else if (scrollY < -60) {
      setAction(action - 1 < 0 ? 0 : action - 1);
    }
  }, [scrollY]);

  useEffect(() => {
    let datessnap: Moment[] = [];
    for (let i = -8; i <= 7; i++) {
      datessnap = [...datessnap, moment().add(i, "d")];
    }
    setDates(datessnap);
  }, []);

  //TODO in future make this action selection logic not this worst as now

  return (
    <motion.div
      key={"actions"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      //@ts-ignore
      ref={ref}
      exit={{ opacity: 0 }}
      className="absolute top-0 touch-none flex flex-wrap items-center justify-center left-0 text-zinc-100 bg-black/75 z-10 w-full h-full"
    >
      <AnimatePresence mode="wait">
        {action == 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            key={"actionDate"}
            className="w-full place-items-center px-8 grid grid-cols-5 items-center"
          >
            <button
              onClick={(e) => {
                changeDate(-2);
              }}
            >
              <Fa.FaAngleDoubleLeft size={24} fill="#fff" />
            </button>
            <button
              onClick={(e) => {
                changeDate(-1);
              }}
            >
              <Fa.FaAngleLeft size={24} fill="#fff" />
            </button>
            {dates && (
              <motion.span
                animate={animation}
                className="font-bold text-lg"
                transition={{ duration: 0.3, ease: [0, 1, 0, 1] }}
              >
                {dates[selectedDate].day() == moment().day()
                  ? "Today"
                  : dates[selectedDate].day() == moment().day() - 1
                  ? "Yesterday"
                  : dates[selectedDate].day() == moment().day() + 1
                  ? "Tomorrow"
                  : dates[selectedDate].format("DD.MM")}
              </motion.span>
            )}
            <button
              onClick={(e) => {
                changeDate(1);
              }}
            >
              <Fa.FaAngleRight size={24} fill="#fff" />
            </button>
            <button
              onClick={(e) => {
                changeDate(2);
              }}
            >
              <Fa.FaAngleDoubleRight size={24} fill="#fff" />
            </button>
          </motion.div>
        )}
        {action == 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            key={"actionButtons"}
            className="flex w-full items-center justify-around"
          >
            {dates && History.isCompleted(props.task, dates[selectedDate]) ? (
              <button
                className="rounded-full p-4 bg-black/50"
                onTouchEnd={(e) => {
                  History.revertTask(props.task, dates[selectedDate]);
                  props.setVisible(false);
                }}
              >
                <Fa.FaUndo size={18} />
              </button>
            ) : (
              dates && (
                <button
                  onTouchEnd={(e) => {
                    History.completeTask(props.task, dates[selectedDate]);
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
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default TaskActions;

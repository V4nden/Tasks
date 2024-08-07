import History from "@/utils/store/History";
import Tasks, { ITask } from "@/utils/store/Tasks";
import {
  AnimatePresence,
  AnimationControls,
  motion,
  useAnimation,
} from "framer-motion";
import { observer } from "mobx-react-lite";
import moment, { Moment } from "moment";
import * as Fa from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { TasksPageActions } from "./TasksPage/TasksPage";

type Props = {
  task: ITask;
  visible: boolean;
  setVisible: Function;
  animate: AnimationControls;
};

const TaskActions = observer((props: Props) => {
  const router = useRouter();
  const [dates, setDates] = useState<Moment[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(8);

  const [action, setAction] = useState(0);
  const [swipe, setSwipe] = useState(0);
  const animation = useAnimation();

  function changeDate(how: number) {
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
  }
  function deleteTask() {
    props.setVisible(false);
    props.animate.set({ lineHeight: 0, display: "block", border: 0 });
    props.animate
      .start({ height: 0, paddingTop: 0, paddingBottom: 0 })
      .then(() => {
        Tasks.deleteTask(props.task);
      });
  }
  useEffect(() => {
    let datessnap: Moment[] = [];
    for (let i = -8; i <= 7; i++) {
      datessnap = [...datessnap, moment().add(i, "d")];
    }
    setDates(datessnap);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {props.visible && (
        <motion.div
          key={"actions"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 touch-none rounded-lg flex flex-wrap items-center justify-center left-0 text-zinc-100 bg-black/75 z-10 w-full h-full"
          onTouchStart={(e) => {
            setSwipe(e.changedTouches[0].clientY);
          }}
          onTouchEnd={(e) => {
            if (e.changedTouches[0].clientY - swipe > 70) {
              setAction(action - 1 >= 0 ? action - 1 : action);
            } else if (e.changedTouches[0].clientY - swipe < -70) {
              setAction(action + 1 < 2 ? action + 1 : action);
            }
          }}
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
                {dates &&
                History.isCompleted(props.task, dates[selectedDate]) ? (
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
                        props.task.type.type == "onetime" && deleteTask();
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
                    TasksPageActions.setTask({
                      id: props.task.id,
                      type: props.task.type,
                    });
                    props.setVisible(false);
                  }}
                >
                  <Fa.FaPen size={18} />
                </button>
                <button
                  className="rounded-full p-4 bg-black/50"
                  onTouchEnd={(e) => {
                    deleteTask();
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
      )}
    </AnimatePresence>
  );
});

export default TaskActions;

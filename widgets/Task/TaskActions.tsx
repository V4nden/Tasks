import History from "@/shared/utils/store/History";
import Tasks, { ITask } from "@/shared/utils/store/Tasks";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { observer } from "mobx-react-lite";
import moment, { Moment } from "moment";
import * as Fa from "react-icons/fa";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaX } from "react-icons/fa6";
import useSwipe from "@/shared/utils/useSwipe";
import TaskActionDate from "@/features/Task/TaskActions/TaskActionDate";
import TaskActionButtons from "@/features/Task/TaskActions/TaskActionButtons";

type Props = { task: ITask; setVisible: Dispatch<SetStateAction<boolean>> };

const TaskActions = observer((props: Props) => {
  const [selectedDate, setSelectedDate] = useState<number>(8);

  const [action, setAction] = useState(0);
  const animation = useAnimation();
  const [dates, setDates] = useState<Moment[] | null>(null);
  useEffect(() => {
    let datessnap: Moment[] = [];
    for (let i = -8; i <= 7; i++) {
      datessnap = [...datessnap, moment().add(i, "d")];
    }
    setDates(datessnap);
  }, []);

  const ref = useRef();
  const { scrollY } = useSwipe(ref.current);

  useEffect(() => {
    if (scrollY > 60) {
      setAction(action + 1 > 1 ? 1 : action + 1);
    } else if (scrollY < -60) {
      setAction(action - 1 < 0 ? 0 : action - 1);
    }
  }, [scrollY]);

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
          <TaskActionDate
            animation={animation}
            dates={dates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        {action == 0 && (
          <TaskActionButtons
            dates={dates}
            selectedDate={selectedDate}
            setVisible={props.setVisible}
            task={props.task}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default TaskActions;

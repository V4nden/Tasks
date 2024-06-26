import Tag from "@/components/ui/Tag";
import Tags from "@/utils/store/Tags";
import useSwipe from "@/utils/useSwipe";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaPlus, FaTag } from "react-icons/fa";
import uuid4 from "uuid4";
import { ITasksActions } from "./TasksPage";

type Props = {
  setTasksActions: Dispatch<SetStateAction<ITasksActions>>;
  tasksActions: ITasksActions;
};

const TasksActions = observer((props: Props) => {
  const router = useRouter();
  const ref = React.createRef<HTMLDivElement>();
  const { x, y } = useSwipe(ref);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (x > 60) {
      setOpened(false);
    } else if (x < -60) {
      setOpened(true);
    }
  }, [x]);
  function switchFilter(tag: string) {
    if (props.tasksActions.filter.includes(tag)) {
      props.setTasksActions({
        filter: [...props.tasksActions.filter.filter((el) => el != tag)],
      });
    } else {
      props.setTasksActions({ filter: [...props.tasksActions.filter, tag] });
    }
  }
  return (
    <div
      className={`w-full my-2 px-4 flex touch-pan-x justify-end border-zinc-800 items-center gap-2 fixed bottom-16 z-20 transition-all ${
        opened ? "pointer-events-auto" : "pointer-events-none"
      } ${opened && "touch-none border-y bg-zinc-950/75 backdrop-blur-sm"}`}
    >
      <div className="overflow-x-hidden">
        <AnimatePresence mode="wait">
          {opened && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease: [0, 1, 0, 1], duration: 0.5 }}
              className="flex gap-2 overflow-x-scroll scrollbar-hide rounded-full"
            >
              {Tags.tags.map((el) => {
                return (
                  <button
                    key={el.id}
                    onClick={() => switchFilter(el.id)}
                    style={{ backgroundColor: el.color }}
                    className={`rounded-full transition-all ease-out ${
                      !props.tasksActions.filter.includes(el.id) &&
                      "brightness-75"
                    }`}
                  >
                    <Tag tag={el} />
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div ref={ref} className="pointer-events-auto">
        <button
          onClick={(e) => {
            opened
              ? setOpened(false)
              : router.replace("/task?id=" + uuid4() + "&type=scheduled");
          }}
          className={`rounded-full transition-all border-zinc-800 p-4  ${
            !opened && "bg-zinc-950/50 backdrop-blur-sm border"
          }`}
        >
          <AnimatePresence mode="wait">
            {!opened && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
                key={"not"}
              >
                <FaPlus fill="#fff" size={24}></FaPlus>
              </motion.div>
            )}
            {opened && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
                key={"opened"}
              >
                <FaTag fill="#fff" size={24}></FaTag>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
});

export default TasksActions;

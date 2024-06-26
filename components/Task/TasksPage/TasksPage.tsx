"use client";
import SwipeContainer from "@/components/SwipeContainer";
import Task from "@/components/Task/Task";
import Tasks, { ITask } from "@/utils/store/Tasks";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import TasksActions from "./TasksActions";
import { ITag } from "@/utils/store/Tags";

type Props = {};
export interface ITasksActions {
  filter: string[];
}
const TasksPage = observer((props: Props) => {
  useEffect(() => {
    document.oncontextmenu = (e) => {
      e.preventDefault();
    };
  }, []);

  const [tasksActions, setTasksActions] = useState<ITasksActions>({
    filter: [],
  });
  function sortTasks(a: ITask, b: ITask): number {
    return (
      (a.time
        ? parseInt(a.time?.split(":")[0]) * 60 + parseInt(a.time?.split(":")[1])
        : 0) +
      100 / a.priority -
      ((b.time
        ? parseInt(b.time?.split(":")[0]) * 60 + parseInt(b.time?.split(":")[1])
        : 0) +
        100 / b.priority)
    );
  }
  function filteredStyles(task: ITask): string {
    return tasksActions.filter.length > 0
      ? task.tags.some((el) => tasksActions.filter.includes(el))
        ? ""
        : "opacity-50"
      : "";
  }
  function sortByFilter(a: ITask, b: ITask): number {
    if (tasksActions.filter.length == 0) return 0;
    return (
      b.tags.reduce((acc, el) => {
        return acc + (tasksActions.filter.includes(el) ? 1 : 0);
      }, 0) -
      a.tags.reduce((acc, el) => {
        return acc + (tasksActions.filter.includes(el) ? 1 : 0);
      }, 0)
    );
  }
  return (
    <main>
      <SwipeContainer className="min-h-screen pb-16" containerClassName="p-4">
        {[
          "Scheduled",
          <motion.div
            layoutRoot
            key={"scheduled"}
            className="flex-col gap-2 overflow-y-scrol flex"
          >
            {Tasks.tasks
              .slice()
              .filter((el) => el.type == "scheduled")
              .sort(sortTasks)
              .sort(sortByFilter)
              .map((task) => (
                <Task
                  className={filteredStyles(task)}
                  {...task}
                  key={task.id}
                />
              ))}
          </motion.div>,
        ]}
        {[
          "Uncheduled",
          <motion.div
            layoutRoot
            key={"uncheduled"}
            className="flex-col gap-2 overflow-y-scrol flex"
          >
            {Tasks.tasks
              .slice()
              .filter((el) => el.type == "unscheduled")
              .sort(sortTasks)
              .sort(sortByFilter)
              .map((task) => (
                <Task
                  className={filteredStyles(task)}
                  {...task}
                  key={task.id}
                />
              ))}
          </motion.div>,
        ]}
        {[
          "Onetime",
          <motion.div
            layoutRoot
            key={"onetime"}
            className="flex-col gap-2 overflow-y-scrol flex"
          >
            {Tasks.tasks
              .slice()
              .filter((el) => el.type == "onetime")
              .sort(sortTasks)
              .sort(sortByFilter)
              .map((task) => (
                <Task
                  className={filteredStyles(task)}
                  {...task}
                  key={task.id}
                />
              ))}
          </motion.div>,
        ]}
      </SwipeContainer>

      <TasksActions
        tasksActions={tasksActions}
        setTasksActions={setTasksActions}
      />
    </main>
  );
});

export default TasksPage;

"use client";
import SwipeContainer from "@/components/SwipeContainer";
import Task from "@/components/Task/Task";
import Tasks, { ITask } from "@/utils/store/Tasks";
import { frame, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import TasksActions from "./TasksActions";
import { ITag } from "@/utils/store/Tags";
import { makeAutoObservable } from "mobx";
import TasksModification from "../TasksModification";
import Popup from "@/components/ui/Popup";
import uuid4 from "uuid4";

class TasksPageActionsStore {
  filter: string[] = [];
  task: { id: string; type: "scheduled" | "unscheduled" | "onetime" } | null =
    null;
  constructor() {
    makeAutoObservable(this);
  }
  setTask(
    task: { id: string; type: "scheduled" | "unscheduled" | "onetime" } | null
  ) {
    this.task = task;
  }
  setFilter(filter: string[]) {
    this.filter = filter;
  }
}

export const TasksPageActions = new TasksPageActionsStore();

type Props = {};

const TasksPage = observer((props: Props) => {
  useEffect(() => {
    document.oncontextmenu = (e) => {
      e.preventDefault();
    };
  }, []);
  const [selectedType, setSelectedType] = useState(0);
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
    return TasksPageActions.filter.length > 0
      ? task.tags.some((el) => TasksPageActions.filter.includes(el))
        ? ""
        : "opacity-50"
      : "";
  }
  function sortByFilter(a: ITask, b: ITask): number {
    if (TasksPageActions.filter.length == 0) return 0;
    return (
      b.tags.reduce((acc, el) => {
        return acc + (TasksPageActions.filter.includes(el) ? 1 : 0);
      }, 0) -
      a.tags.reduce((acc, el) => {
        return acc + (TasksPageActions.filter.includes(el) ? 1 : 0);
      }, 0)
    );
  }
  return (
    <main>
      <SwipeContainer
        frameActions={{ frame: selectedType, setFrame: setSelectedType }}
        className="min-h-screen pb-16"
        containerClassName="p-4"
      >
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
      <Popup
        title={`${
          Tasks.hasTask(String(TasksPageActions.task?.id)) ? "Edit" : "Create"
        } ${["scheduled", "unscheduled", "onetime"][selectedType]} task`}
        opened={!!TasksPageActions.task}
        setOpened={() => {
          TasksPageActions.setTask(null);
        }}
      >
        {TasksPageActions.task && (
          <TasksModification
            id={TasksPageActions.task.id}
            type={TasksPageActions.task.type}
          />
        )}
      </Popup>
      <TasksActions
        //@ts-ignore
        selectedType={["scheduled", "unscheduled", "onetime"][selectedType]}
      />
    </main>
  );
});

export default TasksPage;

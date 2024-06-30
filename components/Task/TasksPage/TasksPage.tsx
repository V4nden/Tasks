"use client";
import SwipeContainer from "@/components/SwipeContainer";
import Task from "@/components/Task/Task";
import Tasks, {
  IOnetimeTaskType,
  IScheduledTaskType,
  ITask,
  IUnscheduledTaskType,
  TaskType,
} from "@/utils/store/Tasks";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import TasksActions from "./TasksActions";
import { makeAutoObservable } from "mobx";
import Popup from "@/components/ui/Popup";
import moment from "moment";
import TasksModification from "../TaskModification/TasksModification";

class TasksPageActionsStore {
  filter: string[] = [];
  task: {
    id: string;
    type: TaskType;
  } | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  setTask(
    task: {
      id: string;
      type: TaskType;
    } | null
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
  const taskTypes: [
    IScheduledTaskType,
    IUnscheduledTaskType,
    IOnetimeTaskType
  ] = [
    {
      time: "12:00",
      type: "scheduled",
    },
    {
      type: "unscheduled",
    },
    {
      date: moment().format("DD.MM.YYYY"),
      type: "onetime",
    },
  ];
  useEffect(() => {
    document.oncontextmenu = (e) => {
      e.preventDefault();
    };
  }, []);
  const [selectedType, setSelectedType] = useState(0);
  function sortTasks(a: ITask, b: ITask): number {
    if (a.type.type == "scheduled" && b.type.type == "scheduled") {
      return (
        (a.type.time
          ? parseInt(a.type.time.split(":")[0]) * 60 +
            parseInt(a.type.time.split(":")[1])
          : 0) +
        100 / a.priority -
        ((b.type.time
          ? parseInt(b.type.time.split(":")[0]) * 60 +
            parseInt(b.type.time.split(":")[1])
          : 0) +
          100 / b.priority)
      );
    } else {
      return 100 / a.priority - 100 / b.priority;
    }
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
              .filter((el) => el.type.type == "scheduled")
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
              .filter((el) => el.type.type == "unscheduled")
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
              .filter((el) => el.type.type == "onetime")
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
        } ${taskTypes[selectedType].type} task`}
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
      <TasksActions selectedType={taskTypes[selectedType]} />
    </main>
  );
});

export default TasksPage;

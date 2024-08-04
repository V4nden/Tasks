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
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    setCurrent(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);
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
      <Carousel orientation="horizontal" setApi={setCarouselApi}>
        <CarouselContent>
          <CarouselItem>
            <motion.div
              layoutRoot
              key={"scheduled"}
              className="flex-col gap-2 flex min-h-screen p-4"
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
            </motion.div>
          </CarouselItem>
          <CarouselItem>
            <motion.div
              layoutRoot
              key={"uncheduled"}
              className="flex-col gap-2 flex min-h-screen p-4"
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
            </motion.div>
          </CarouselItem>
          <CarouselItem>
            <motion.div
              layoutRoot
              key={"onetime"}
              className="flex-col gap-2 flex p-4"
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
            </motion.div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <Popup
        title={`${
          Tasks.hasTask(String(TasksPageActions.task?.id)) ? "Edit" : "Create"
        } ${taskTypes[current].type} task`}
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
      <TasksActions selectedType={taskTypes[current]} />
    </main>
  );
});

export default TasksPage;

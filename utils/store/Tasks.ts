"use client";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export interface IScheduledTaskType {
  time: string;
  type: "scheduled";
}
export interface IUnscheduledTaskType {
  type: "unscheduled";
}
export interface IOnetimeTaskType {
  date: string;
  type: "onetime";
}

export type TaskType =
  | IScheduledTaskType
  | IUnscheduledTaskType
  | IOnetimeTaskType;

export interface ITask {
  name: string;
  description: string;
  color: string;
  tags: string[];
  icon: string;
  id: string;
  howlong?: {
    started: number | null;
    time: number | null;
  };
  priority: number;
  type: TaskType;
}

class Tasks {
  tasks: ITask[] = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "TasksStore",
      properties: ["tasks"],
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    });
  }

  createTask(task: ITask) {
    this.tasks = [...this.tasks, task];
  }
  deleteTask(task: ITask) {
    this.tasks = this.tasks.filter((el) => el.id != task.id);
  }
  editTask(id: string, task: ITask) {
    this.tasks = [...this.tasks.filter((el) => el.id != id), task];
  }
  fromImported(data: any) {
    this.tasks = data["TasksStore"]["tasks"];
  }
  hasTask(id: string): boolean {
    return this.tasks.some((el) => {
      return el.id == id;
    });
  }
  getTaskById(id: string): ITask | undefined {
    return this.tasks.find((el) => {
      return el.id == id;
    });
  }
}

export default new Tasks();

"use client";
import { makeAutoObservable } from "mobx";
import { ITag } from "./Tags";
import { makePersistable } from "mobx-persist-store";

export interface ITask {
  name: string;
  description: string;
  color: string;
  time: string | null;
  tags: string[];
  icon: string;
  id: string;
  priority: number;
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
}

export default new Tasks();

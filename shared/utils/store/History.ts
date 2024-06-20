"use client";
import { makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";
import Tasks, { ITask } from "./Tasks";
import moment, { Moment } from "moment";

interface IHistory {
  [date: string]: {
    tasks: ITask[];
  };
}

class History {
  history: IHistory = {};

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "HistoryStore",
      properties: ["history"],
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    });
  }

  isCompleted(task: ITask, when: Moment): boolean {
    if (this.history.hasOwnProperty(when.format("DDMMYYYY"))) {
      return (
        this.history[when.format("DDMMYYYY")].tasks.filter(
          (el) => el.id == task.id
        ).length > 0
      );
    } else {
      return false;
    }
  }

  fromImported(data: any) {
    this.history = data["HistoryStore"]["history"];
  }

  completeTask(task: ITask, when: Moment) {
    if (this.isCompleted(task, when)) return;
    if (this.history[when.format("DDMMYYYY")]) {
      this.history = {
        ...this.history,
        [when.format("DDMMYYYY")]: {
          tasks: [...this.history[when.format("DDMMYYYY")].tasks, task],
        },
      };
    } else {
      this.history = {
        ...this.history,
        [when.format("DDMMYYYY")]: { tasks: [task] },
      };
    }
  }

  revertTask(task: ITask, when: Moment) {
    if (!this.isCompleted(task, when)) return;
    this.history = {
      ...this.history,
      [when.format("DDMMYYYY")]: {
        tasks: this.history[when.format("DDMMYYYY")].tasks.filter((el) => {
          return el.id != task.id;
        }),
      },
    };
  }

  getStats(from: Moment, to: Moment) {
    let snapstats: {
      [key: string]: { completed: number; priority: number };
    } = {};
    for (let i = 1; i <= Math.abs(from.diff(to, "d")); i++) {
      const date = moment(from).add(i, "days").format("DDMMYYYY");
      //@ts-ignore
      snapstats[date] = this.history[date]
        ? toJS(this.history[date].tasks).reduce<{
            completed?: number;
            priority?: number;
          }>((acc, el, index, arr) => {
            return {
              ...acc,
              completed: acc.completed
                ? ((index + 1) / Tasks.tasks.length) * 100
                : (1 / Tasks.tasks.length) * 100,
              priority: acc.priority
                ? acc.priority +
                  (el.priority * 100) /
                    Tasks.tasks.reduce((acc, el) => acc + el.priority, 0)
                : (el.priority * 100) /
                  Tasks.tasks.reduce((acc, el) => acc + el.priority, 0),
            };
          }, {})
        : { completed: 0, priority: 0 };
    }
    return snapstats;
  }
}

export default new History();

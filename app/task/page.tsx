"use client";
import IconSelector from "@/shared/ui/IconSelector";
import Input from "@/shared/ui/Input";
import Tag from "@/shared/ui/Tag";
import Tags from "@/shared/utils/store/Tags";
import Tasks, { ITask } from "@/shared/utils/store/Tasks";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Fa from "react-icons/fa";
import uuid4 from "uuid4";
type Props = {};

const page = observer((props: Props) => {
  const [taskForm, setTaskForm] = useState<ITask>({
    name: "",
    description: "",
    color: "#64748b",
    time: "12:00",
    tags: [],
    icon: "FaInfo",
    id: uuid4(),
    priority: 100,
  });
  const router = useRouter();
  return (
    <main className="gap-2 text-zinc-100 flex items-center flex-col p-4">
      <h1 className="text-2xl text-zinc-100  font-bold">Create new task</h1>
      <h2 className="text-sm text-zinc-500 font-bold">{taskForm.id}</h2>
      <div className="flex gap-2 w-full">
        <Input
          placeholder="Task name"
          value={taskForm.name}
          onChange={(e) => {
            setTaskForm({ ...taskForm, name: e.currentTarget.value });
          }}
        />
        <IconSelector
          onSelected={(e: string) => {
            setTaskForm({ ...taskForm, icon: e });
          }}
        />
      </div>
      <Input
        placeholder="Short description"
        value={taskForm.description}
        onChange={(e) => {
          setTaskForm({ ...taskForm, description: e.currentTarget.value });
        }}
      />
      <div className="flex border flex-wrap gap-2 justify-center p-2 rounded-xl border-zinc-800">
        {[
          "#ffffff",
          "#64748b",
          "#78716c",
          "#ef4444",
          "#f97316",
          "#f59e0b",
          "#eab308",
          "#84cc16",
          "#10b981",
          "#14b8a6",
          "#06b6d4",
          "#0ea5e9",
          "#3b82f6",
          "#6366f1",
          "#8b5cf6",
          "#a855f7",
          "#d946ef",
          "#ec4899",
        ].map((el) => {
          return (
            <button
              className={`h-8 w-8 rounded-lg transition-all border-2 border-zinc-100 ease-out ${
                el == taskForm.color ? "border-opacity-100" : "border-opacity-0"
              }`}
              onClick={(e) => {
                setTaskForm((prev) => ({ ...prev, color: el }));
              }}
              style={{ backgroundColor: el }}
              key={el}
            />
          );
        })}
      </div>
      <div className="flex items-center w-full gap-1">
        <Input
          value={taskForm.time ? taskForm.time : "14:12"}
          disabled={!taskForm.time}
          onChange={(e) => {
            setTaskForm({ ...taskForm, time: e.currentTarget.value });
          }}
          type="time"
          className="w-full"
        />
        <Input
          type="checkbox"
          checked={!!taskForm.time}
          onChange={(e) => {
            setTaskForm({ ...taskForm, time: taskForm.time ? null : "12:00" });
          }}
          className="w-8 h-8 p-2"
        />
      </div>
      <div className="flex flex-wrap border gap-2 w-full p-2 rounded-xl border-zinc-800">
        {Tags.tags.map((tag) => {
          return (
            <button
              key={tag.id}
              className="rounded-xl flex items-center justify-center"
              style={{ backgroundColor: tag.color }}
              onClick={(e) =>
                setTaskForm({
                  ...taskForm,
                  tags: taskForm.tags.includes(tag.id)
                    ? taskForm.tags.filter((el) => el != tag.id)
                    : [...taskForm.tags, tag.id],
                })
              }
            >
              {taskForm.tags.includes(tag.id) && (
                <Fa.FaCheck fill="#fff" size={14} className="ml-2" />
              )}
              <Tag tag={tag} />
            </button>
          );
        })}
      </div>
      <div className="p-2 border border-zinc-800 w-full rounded-xl">
        <p className="text-sm text-zinc-400 text-center">
          Priotity: {taskForm.priority}%
        </p>
        <input
          type="range"
          value={taskForm.priority}
          onChange={(e) =>
            setTaskForm({
              ...taskForm,
              priority: parseInt(e.currentTarget.value),
            })
          }
          className="w-full "
        />
        <div className="flex gap-2 p-2">
          <button
            className="p-2 border border-zinc-800 w-full rounded-xl"
            onClick={(e) => {
              setTaskForm({
                ...taskForm,
                priority:
                  taskForm.priority - 10 < 0
                    ? taskForm.priority
                    : taskForm.priority - 10,
              });
            }}
          >
            -10
          </button>
          <button
            className="p-2 border border-zinc-800 w-full rounded-xl"
            onClick={(e) => {
              setTaskForm({
                ...taskForm,
                priority: Math.round(taskForm.priority / 10) * 10,
              });
            }}
          >
            Round
          </button>
          <button
            className="p-2 border border-zinc-800 w-full rounded-xl"
            onClick={(e) => {
              setTaskForm({
                ...taskForm,
                priority:
                  taskForm.priority + 10 > 100
                    ? taskForm.priority
                    : taskForm.priority + 10,
              });
            }}
          >
            +10
          </button>
        </div>
      </div>
      <button
        onClick={(e) => {
          Tasks.createTask(taskForm);
          router.push("/");
        }}
        className="p-2 border border-zinc-800 w-full rounded-xl"
      >
        Submit
      </button>
    </main>
  );
});

export default page;

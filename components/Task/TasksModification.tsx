import Tasks, { ITask } from "@/utils/store/Tasks";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import uuid4 from "uuid4";
import Input from "../ui/Input";
import Tags from "@/utils/store/Tags";
import Tag from "../ui/Tag";
import * as Fa from "react-icons/fa";
import IconSelector from "../ui/IconSelector";
import { TasksPageActions } from "./TasksPage/TasksPage";
type Props = { id: string; type: "scheduled" | "unscheduled" | "onetime" };

const TasksModification = observer((props: Props) => {
  const defaultValues = (): ITask => {
    //@ts-ignore
    return Tasks.getTaskById(props.id)
      ? //@ts-ignore
        Tasks.getTaskById(props.id)
      : {
          name: "",
          description: "",
          color: "#64748b",
          time: props.type != "unscheduled" && "12:00",
          tags: [],
          icon: "FaInfo",
          id: props.id,
          priority: 100,
          type: props.type,
        };
  };
  const [taskForm, setTaskForm] = useState<ITask>(defaultValues());
  useEffect(() => {
    setTaskForm(defaultValues());
    console.log(props.type);
  }, [props]);

  const router = useRouter();

  return (
    <div className="gap-2 text-zinc-100 flex items-center flex-col">
      <Input
        placeholder="Task name"
        value={taskForm.name}
        onChange={(e) => {
          setTaskForm({ ...taskForm, name: e.currentTarget.value });
        }}
      />
      <div className="flex gap-2 w-full">
        <Input
          placeholder="Short description"
          value={taskForm.description}
          onChange={(e) => {
            setTaskForm({ ...taskForm, description: e.currentTarget.value });
          }}
        />
        <IconSelector
          onSelected={(e: string) => {
            setTaskForm({ ...taskForm, icon: e });
          }}
        />
      </div>

      <div className="flex bg-zinc-950 border flex-wrap gap-2 justify-center p-2 rounded-xl border-zinc-800">
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
      {taskForm.type != "unscheduled" && (
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
              setTaskForm({
                ...taskForm,
                time: taskForm.time ? null : "12:00",
              });
            }}
            className="w-8 h-8 p-2"
          />
        </div>
      )}
      <div className="flex flex-wrap border gap-2 w-full p-2 bg-zinc-950 rounded-xl border-zinc-800">
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
      <div className="p-2 border border-zinc-800 bg-zinc-950 w-full rounded-xl">
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
          Tasks.hasTask(taskForm.id)
            ? Tasks.editTask(taskForm.id, taskForm)
            : Tasks.createTask(taskForm);

          TasksPageActions.setTask(null);
        }}
        className="p-2 border bg-zinc-950 border-zinc-800 w-full rounded-xl"
      >
        Submit
      </button>
    </div>
  );
});

export default TasksModification;

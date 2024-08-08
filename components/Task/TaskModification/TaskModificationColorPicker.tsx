import { ITask } from "@/utils/store/Tasks";
import { Dispatch, SetStateAction } from "react";

type Props = { taskForm: ITask; setTaskForm: Dispatch<SetStateAction<ITask>> };

const TaskModificationColorPicker = (props: Props) => {
  return (
    <div className="flex bg-zinc-950 border overflow-x-scroll scrollbar-hide w-full gap-2 justify-center p-2 rounded-lg border-zinc-800">
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
            className={`h-8 w-8 aspect-square rounded-lg transition-all border-2 border-zinc-100 ease-out ${
              el == props.taskForm.color
                ? "border-opacity-100"
                : "border-opacity-0"
            }`}
            onClick={(e) => {
              props.setTaskForm((prev) => ({ ...prev, color: el }));
            }}
            style={{ backgroundColor: el }}
            key={el}
          />
        );
      })}
    </div>
  );
};

export default TaskModificationColorPicker;

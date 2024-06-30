import { ITask } from "@/utils/store/Tasks";
import { Dispatch, SetStateAction } from "react";
type Props = { taskForm: ITask; setTaskForm: Dispatch<SetStateAction<ITask>> };

const TaskModificationPriorityPicker = (props: Props) => {
  return (
    <div className="p-2 border border-zinc-800 bg-zinc-950 w-full rounded-xl">
      <p className="text-sm text-zinc-400 text-center">
        Priotity: {props.taskForm.priority}%
      </p>
      <input
        type="range"
        value={props.taskForm.priority}
        onChange={(e) =>
          props.setTaskForm({
            ...props.taskForm,
            priority: parseInt(e.currentTarget.value),
          })
        }
        className="w-full "
      />
      <div className="flex gap-2 p-2">
        <button
          className="p-2 border border-zinc-800 w-full rounded-xl"
          onClick={(e) => {
            props.setTaskForm({
              ...props.taskForm,
              priority:
                props.taskForm.priority - 10 < 0
                  ? props.taskForm.priority
                  : props.taskForm.priority - 10,
            });
          }}
        >
          -10
        </button>
        <button
          className="p-2 border border-zinc-800 w-full rounded-xl"
          onClick={(e) => {
            props.setTaskForm({
              ...props.taskForm,
              priority: Math.round(props.taskForm.priority / 10) * 10,
            });
          }}
        >
          Round
        </button>
        <button
          className="p-2 border border-zinc-800 w-full rounded-xl"
          onClick={(e) => {
            props.setTaskForm({
              ...props.taskForm,
              priority:
                props.taskForm.priority + 10 > 100
                  ? props.taskForm.priority
                  : props.taskForm.priority + 10,
            });
          }}
        >
          +10
        </button>
      </div>
    </div>
  );
};

export default TaskModificationPriorityPicker;

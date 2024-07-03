import Tasks, { ITask, TaskType } from "@/utils/store/Tasks";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TasksPageActions } from "../TasksPage/TasksPage";
import TaskModificationBaseInfo from "./TaskModificationBaseInfo";
import TaskModificationColorPicker from "./TaskModificationColorPicker";
import TaskModificationScheduledTimePicker from "./Scheduled/TaskModificationScheduledTimePicker";
import TaskModificationTagsPicker from "./TaskModificationTagsPicker";
import TaskModificationPriorityPicker from "./TaskModificationPriorityPicker";
import TaskModificationHowLong from "./TaskModificationHowLong";
type Props = {
  id: string;
  type: TaskType;
};

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
      <TaskModificationBaseInfo taskForm={taskForm} setTaskForm={setTaskForm} />
      <TaskModificationColorPicker
        taskForm={taskForm}
        setTaskForm={setTaskForm}
      />

      <TaskModificationScheduledTimePicker
        taskForm={taskForm}
        setTaskForm={setTaskForm}
      />
      <TaskModificationHowLong taskForm={taskForm} setTaskForm={setTaskForm} />
      <TaskModificationTagsPicker
        taskForm={taskForm}
        setTaskForm={setTaskForm}
      />

      <TaskModificationPriorityPicker
        taskForm={taskForm}
        setTaskForm={setTaskForm}
      />
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

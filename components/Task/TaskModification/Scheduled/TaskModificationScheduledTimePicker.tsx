import Input from "@/components/ui/Input";
import { ITask } from "@/utils/store/Tasks";
import { Dispatch, SetStateAction } from "react";
type Props = { taskForm: ITask; setTaskForm: Dispatch<SetStateAction<ITask>> };

const TaskModificationScheduledTimePicker = (props: Props) => {
  if (props.taskForm.type.type == "scheduled")
    return (
      <div className="flex items-center w-full gap-1">
        <Input
          value={props.taskForm.type.time ? props.taskForm.type.time : "14:12"}
          disabled={!props.taskForm.type.time}
          onChange={(e) => {
            props.setTaskForm({
              ...props.taskForm,
              type: { time: e.currentTarget.value, type: "scheduled" },
            });
          }}
          type="time"
          className="w-full"
        />
      </div>
    );
};

export default TaskModificationScheduledTimePicker;

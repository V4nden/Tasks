import IconSelector from "@/components/ui/IconSelector";
import Input from "@/components/ui/Input";
import { ITask } from "@/utils/store/Tasks";
import React, { Dispatch, SetStateAction } from "react";

type Props = { taskForm: ITask; setTaskForm: Dispatch<SetStateAction<ITask>> };

const TaskModificationBaseInfo = (props: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Input
        placeholder="Task name"
        value={props.taskForm.name}
        onChange={(e) => {
          props.setTaskForm({ ...props.taskForm, name: e.currentTarget.value });
        }}
      />
      <div className="flex gap-2 w-full">
        <Input
          placeholder="Short description"
          value={props.taskForm.description}
          onChange={(e) => {
            props.setTaskForm({
              ...props.taskForm,
              description: e.currentTarget.value,
            });
          }}
        />
        <IconSelector
          onSelected={(e: string) => {
            props.setTaskForm({ ...props.taskForm, icon: e });
          }}
        />
      </div>
    </div>
  );
};

export default TaskModificationBaseInfo;

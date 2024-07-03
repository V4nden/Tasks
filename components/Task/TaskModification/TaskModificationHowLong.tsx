import React from "react";
import { ITask } from "@/utils/store/Tasks";
import { Dispatch, SetStateAction } from "react";
import Input from "@/components/ui/Input";
type Props = { taskForm: ITask; setTaskForm: Dispatch<SetStateAction<ITask>> };

const TaskModificationHowLong = (props: Props) => {
  return (
    <Input
      placeholder="How long?"
      value={props.taskForm.howlong ? String(props.taskForm.howlong.time) : ""}
      onChange={(e) => {
        if (e.currentTarget.value.length == 0) {
          props.setTaskForm({ ...props.taskForm, howlong: undefined });
          return;
        }
        props.setTaskForm({
          ...props.taskForm,
          howlong: {
            started: null,
            time: Number.isNaN(parseInt(e.currentTarget.value))
              ? 60
              : parseInt(e.currentTarget.value),
          },
        });
      }}
    />
  );
};

export default TaskModificationHowLong;

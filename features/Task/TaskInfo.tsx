"use clinet";
import Tag from "@/shared/ui/Tag";
import Tags from "@/shared/utils/store/Tags";
import { ITask } from "@/shared/utils/store/Tasks";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React from "react";
import * as Fa from "react-icons/fa";
interface Props extends ITask {}

const TaskInfo = observer((props: Props) => {
  //@ts-ignore
  //TODO: why
  const Icon = Fa[props.icon];

  const diff = () => {
    if (props.time) {
      const now = moment();
      now.set("hour", parseInt(props.time.split(":")[0]));
      now.set("minute", parseInt(props.time.split(":")[1]));
      now.set("second", 0);
      return now.diff(moment(), "minutes");
    } else {
      return false;
    }
  };
  return (
    <div className="flex items-center gap-2 flex-wrap relative">
      <Icon fill="#fff" size={14} />
      <div className="text-zinc-100 font-bold text-xl">{props.name}</div>
      {typeof diff() == "number" && (
        <div
          style={{
            backgroundColor: `${
              //@ts-ignore
              diff() > 0 ? (diff() > 60 ? "#525252" : "#06b6d4") : "#22c55e"
            }`,
          }}
          className="text-zinc-100 font-bold text-sm flex gap-1 items-center justify-center border border-zinc-800 w-fit p-0.5 px-1 rounded-xl"
        >
          <Fa.FaClock />
          {props.time}
        </div>
      )}
      <div
        style={{
          backgroundColor: `${
            props.priority > 33
              ? props.priority > 66
                ? "#ea580c"
                : "#f59e0b"
              : "#a8a29e"
          }`,
        }}
        className="text-zinc-100 font-bold text-sm flex gap-1 items-center justify-center border border-zinc-800 w-fit p-0.5 px-1 rounded-xl"
      >
        <Fa.FaExclamationCircle />
        {props.priority}%
      </div>
      {props.tags.map((tag, index) => (
        <Tag tag={Tags.tagById(tag)} key={index} />
      ))}
    </div>
  );
});

export default TaskInfo;

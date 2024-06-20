"use clinet";
import React from "react";

type Props = { description: string };

const TaskDescription = (props: Props) => {
  return (
    props.description && <p className="text-zinc-300">{props.description}</p>
  );
};

export default TaskDescription;

import { ITag } from "@/shared/utils/store/Tags";
import React from "react";

type Props = { tag: ITag };

const Tag = (props: Props) => {
  return (
    <span
      className="p-0.5 px-2 text-center font-semibold text-sm rounded-full text-stone-50"
      style={{ backgroundColor: props.tag.color }}
    >
      {props.tag.name}
    </span>
  );
};

export default Tag;

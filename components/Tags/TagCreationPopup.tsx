import React, { useState } from "react";
import Popup from "../ui/Popup";
import Tags, { ITag } from "@/utils/store/Tags";
import uuid4 from "uuid4";
import { Input } from "../ui/input";

type Props = {};

const TagCreationPopup = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [tagForm, setTagForm] = useState<ITag>({
    color: "#fff",
    id: uuid4(),
    name: "",
  });
  return (
    <>
      <button
        className="p-2 border border-zinc-800 rounded-lg w-full text-zinc-300"
        onClick={(e) => setOpened(!opened)}
      >
        Create tag
      </button>
      <Popup title="Create tag" opened={opened} setOpened={setOpened}>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Tag name"
            value={tagForm.name}
            onChange={(e) => {
              setTagForm({ ...tagForm, name: e.currentTarget.value });
            }}
          />
          <div className="flex border flex-wrap gap-2 justify-center p-2 rounded-lg bg-zinc-950 border-zinc-800">
            {[
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
                    el == tagForm.color
                      ? "border-opacity-100"
                      : "border-opacity-0"
                  }`}
                  onClick={(e) => {
                    setTagForm((prev) => ({ ...prev, color: el }));
                  }}
                  style={{ backgroundColor: el }}
                  key={el}
                />
              );
            })}
          </div>
        </div>
        <button
          className="w-full p-2 border border-zinc-800 bg-zinc-950 rounded-lg text-zinc-100"
          onClick={(e) => {
            Tags.createTag(tagForm);

            setTagForm({
              color: "#fff",
              id: uuid4(),
              name: "",
            });
            setOpened(false);
          }}
        >
          Submit
        </button>
      </Popup>
    </>
  );
};

export default TagCreationPopup;

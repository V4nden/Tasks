"use client";
import Tags from "@/utils/store/Tags";
import { observer } from "mobx-react-lite";
import TagCreationPopup from "./TagCreationPopup";

type Props = {};

const TagsPage = observer((props: Props) => {
  const { tags } = Tags;
  return (
    <main className="text-zinc-100 gap-2 h-full flex items-center justify-center flex-col p-4">
      <h1 className="text-2xl text-zinc-100  font-bold">Tags</h1>
      <TagCreationPopup />
      {tags.map((el, index) => {
        return (
          <div
            style={{ background: el.color }}
            className="flex justify-between items-center p-2 rounded-xl w-full border border-zinc-800"
            key={el.id}
          >
            <input
              className="font-bold text-lg outline-none bg-transparent"
              onChange={(e) => {
                Tags.editTag(el.id, { ...el, name: e.currentTarget.value });
              }}
              value={el.name}
            ></input>
            <input
              type="color"
              className="w-8 h-8 outline-none"
              style={{ backgroundColor: el.color }}
              value={el.color}
              onChange={(e) => {
                Tags.editTag(el.id, { ...el, color: e.currentTarget.value });
              }}
            />
          </div>
        );
      })}
    </main>
  );
});

export default TagsPage;

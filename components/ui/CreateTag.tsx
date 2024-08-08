"use client";
import React, { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import * as Fa from "react-icons/fa";
import Input from "./Input";
import iconFromId from "../../utils/iconFromId";
import { observer } from "mobx-react-lite";
import Tags from "@/utils/store/Tags";
import uuid4 from "uuid4";
type Props = {};

const CreateTag = observer((props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [tagForm, setTagForm] = useState({
    name: "",
    color: "#ffffff",
    id: uuid4(),
  });
  useEffect(() => {
    setTagForm({
      name: "",
      color: "#ffffff",
      id: uuid4(),
    });
  }, [Tags.tags]);

  return (
    <>
      <button
        className="p-2 border w-full text-lg border-zinc-800 rounded-lg"
        onClick={() => {
          setVisible((prev) => !prev);
        }}
      >
        Create tag
      </button>
      {visible && (
        <div className="backdrop-blur-md fixed w-full min-h-screen max-h-screen top-0 left-0 gap-2 flex flex-col p-4 z-20">
          <div className="text-zinc-100 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Create new tag</h1>
            <button
              onClick={() => {
                setVisible((prev) => !prev);
              }}
            >
              <FaX />
            </button>
          </div>
          <Input
            value={tagForm.name}
            placeholder="Tag name"
            onChange={(e) => {
              setTagForm({ ...tagForm, name: e.currentTarget.value });
            }}
          />
          <Input
            value={tagForm.color}
            placeholder="Tag name"
            className="h-16"
            type="color"
            onChange={(e) => {
              setTagForm({ ...tagForm, color: e.currentTarget.value });
            }}
          />
          <button
            onClick={(e) => {
              Tags.createTag(tagForm);
            }}
            className="border-zinc-800 border w-full p-2 rounded-lg bg-zinc-900"
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
});

export default CreateTag;

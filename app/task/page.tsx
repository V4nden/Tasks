"use client";
import SwipeContainer from "@/components/SwipeContainer";
import TaskPage from "@/components/Task/TaskPage";
import Tasks, { ITask } from "@/utils/store/Tasks";
import { observer } from "mobx-react-lite";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const page = observer((props: Props) => {
  const id = useSearchParams().get("id");
  const type = useSearchParams().get("type");
  if (type && ["scheduled", "unscheduled", "onetime"].includes(type)) {
    return (
      <main className="flex flex-col overflow-y-hidden items-center gap-1 pt-4">
        <h1 className="text-2xl text-zinc-100  font-bold">
          {Tasks.hasTask(String(id)) ? "Edit task" : "Create task"}
        </h1>
        <h2 className="text-sm text-zinc-400 font-bold">{id}</h2>
        <SwipeContainer
          className="min-h-screen"
          noSwipe={Tasks.hasTask(String(id))}
          titleClassName="p-0 pb-2 text-zinc-500"
          selectedFrame={["scheduled", "unscheduled", "onetime"].indexOf(type)}
        >
          {/* @ts-ignore */}
          {[
            "Scheduled",
            <TaskPage id={String(id)} type={"scheduled"} key={"scheduled"} />,
          ]}
          {/* @ts-ignore */}
          {[
            "Unscheduled",
            <TaskPage
              id={String(id)}
              type={"unscheduled"}
              key={"unscheduled"}
            />,
          ]}
          {/* @ts-ignore */}
          {[
            "Onetime",
            <TaskPage id={String(id)} type={"onetime"} key={"onetime"} />,
          ]}
        </SwipeContainer>
      </main>
    );
  } else {
    return <div></div>;
  }
});

export default page;

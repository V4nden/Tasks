"use client";
import ExportData from "@/widgets/Settings/ExportData";
import ImportData from "@/widgets/Settings/ImportData";
import IconSelector from "@/shared/ui/IconSelector";
import Input from "@/shared/ui/Input";
import Tag from "@/shared/ui/Tag";
import Tags from "@/shared/utils/store/Tags";
import Tasks, { ITask } from "@/shared/utils/store/Tasks";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Fa from "react-icons/fa";
import uuid4 from "uuid4";
type Props = {};

const page = observer((props: Props) => {
  return (
    <main className="gap-2 text-zinc-100 flex items-center justify-center flex-col p-4">
      <h1 className="text-2xl text-zinc-100  font-bold">Settings</h1>
      <ExportData />
      <ImportData />
    </main>
  );
});

export default page;

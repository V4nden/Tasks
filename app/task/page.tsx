"use client";
import TaskPage from "@/components/Task/TaskPage";
import IconSelector from "@/components/ui/IconSelector";
import Input from "@/components/ui/Input";
import Tag from "@/components/ui/Tag";
import Tags from "@/utils/store/Tags";
import Tasks, { ITask } from "@/utils/store/Tasks";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Fa from "react-icons/fa";
import uuid4 from "uuid4";
type Props = {};

const page = observer((props: Props) => {
  const id = useSearchParams().get("id");
  return <TaskPage id={String(id)} />;
});

export default page;

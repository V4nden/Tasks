import { motion } from "framer-motion";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import * as Fa from "react-icons/fa";
type Props = {
  setSelectedDate: any;
  animation: any;
  selectedDate: number;
  dates: Moment[] | null;
};

const TaskActionDate = (props: Props) => {
  const changeDate = (how: number) => {
    if (!props.dates) return;

    props.animation.start({ x: -how * 30, opacity: 0 }).then(() => {
      props.animation.set({ x: how * 30 });
      props.setSelectedDate(
        props.selectedDate + how < 0 ||
          props.selectedDate + how > props.dates.length - 1
          ? props.selectedDate
          : props.selectedDate + how
      );
      props.animation.start({ x: 0, opacity: 1 });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      key={"actionDate"}
      className="w-full place-items-center px-8 grid grid-cols-5 items-center"
    >
      <button
        onClick={(e) => {
          changeDate(-2);
        }}
      >
        <Fa.FaAngleDoubleLeft size={24} fill="#fff" />
      </button>
      <button
        onClick={(e) => {
          changeDate(-1);
        }}
      >
        <Fa.FaAngleLeft size={24} fill="#fff" />
      </button>
      {props.dates && (
        <motion.span
          animate={props.animation}
          className="font-bold text-lg"
          transition={{ duration: 0.3, ease: [0, 1, 0, 1] }}
        >
          {props.dates[props.selectedDate].day() == moment().day()
            ? "Today"
            : props.dates[props.selectedDate].day() == moment().day() - 1
            ? "Yesterday"
            : props.dates[props.selectedDate].day() == moment().day() + 1
            ? "Tomorrow"
            : props.dates[props.selectedDate].format("DD.MM")}
        </motion.span>
      )}
      <button
        onClick={(e) => {
          changeDate(1);
        }}
      >
        <Fa.FaAngleRight size={24} fill="#fff" />
      </button>
      <button
        onClick={(e) => {
          changeDate(2);
        }}
      >
        <Fa.FaAngleDoubleRight size={24} fill="#fff" />
      </button>
    </motion.div>
  );
};

export default TaskActionDate;

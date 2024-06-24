"use client";
import useSwipe from "@/utils/useSwipe";
import { motion, useAnimation, useScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

type Props = { children: [string, React.ReactNode][] };

const SwipeContainer = (props: Props) => {
  const ref = React.createRef<HTMLDivElement>();
  const { x, y, est } = useSwipe(ref);
  const [selected, setSelected] = useState(0);
  const animation = useAnimation();
  const transition = { duration: 0.2, ease: [1, 0, 0.5, 1] };
  async function swipeAnimation(direction: "left" | "right") {
    await animation.start({ x: direction == "left" ? 100 : -100, opacity: 0 });
    await animation.set({ x: direction == "left" ? -100 : 100 });
    animation.start({ x: 0, opacity: 1 });
  }
  function changeSelection(how: number) {
    if (how > 0) {
      setSelected(
        selected + how > props.children.length - 1 ? selected : selected + how
      );
    } else if (how < 0) {
      setSelected(selected + how < 0 ? selected : selected + how);
    }
  }
  useEffect(() => {
    if (x > 60) {
      swipeAnimation("left").then(() => {
        changeSelection(-1);
      });
    } else if (x < 60) {
      swipeAnimation("right").then(() => {
        changeSelection(1);
      });
    }
    console.log(x);
  }, [x]);

  return (
    <div ref={ref} className="overflow-x-hidden">
      <div className="py-2 w-full text-center text-zinc-100 font-bold text-lg border-b border-zinc-800">
        <motion.h1 transition={transition} animate={animation}>
          {props.children[selected][0]}
        </motion.h1>
      </div>
      <motion.div
        animate={animation}
        transition={transition}
        className="h-full w-full"
      >
        {props.children[selected][1]}
      </motion.div>
    </div>
  );
};

export default SwipeContainer;

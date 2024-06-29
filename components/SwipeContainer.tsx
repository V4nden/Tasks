"use client";

import useSwipe from "@/utils/useSwipe";
import { motion, useAnimation } from "framer-motion";
import React, {
  Dispatch,
  HTMLProps,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tw-merge";
interface Props extends HTMLProps<HTMLInputElement> {
  children: [string, React.ReactNode][];
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  frameActions?: { frame: number; setFrame: Dispatch<SetStateAction<number>> };
  noSwipe?: boolean;
}

const SwipeContainer = (props: Props) => {
  const ref = React.createRef<HTMLDivElement>();
  const { x } = useSwipe(ref);
  const [rootSelected, setRootSelected] = useState(0);
  const selected = (): number => {
    if (props.frameActions) {
      return props.frameActions.frame;
    } else {
      return rootSelected;
    }
  };
  const setSelected = (): Dispatch<SetStateAction<number>> => {
    if (props.frameActions) {
      return props.frameActions.setFrame;
    } else {
      return setRootSelected;
    }
  };
  const animationTitle = useAnimation();
  const animationContainer = useAnimation();
  const transition = { duration: 0.2, ease: [1, 0, 0.5, 1] };

  function changeSelection(how: number) {
    if (selected() + how > props.children.length - 1 || selected() + how < 0)
      return;
    animationTitle
      .start({
        x: how < 0 ? 100 : -100,
        opacity: 0,
      })
      .then(() => {
        animationTitle.set({ x: how < 0 ? -100 : 100 });
        animationTitle.start({ x: 0, opacity: 1 });
      });
    animationContainer
      .start({
        y: how < 0 ? 10 : -10,
        opacity: 0,
      })
      .then(() => {
        animationContainer.set({ y: how < 0 ? -10 : 10 });
        setSelected()(selected() + how);
        animationContainer.start({ y: 0, opacity: 1 });
      });
  }
  useEffect(() => {
    if (!props.noSwipe)
      if (x > 40) {
        changeSelection(-1);
      } else if (x < -40) {
        changeSelection(1);
      }
  }, [x]);

  return (
    <div ref={ref} className={twMerge("overflow-x-hidden " + props.className)}>
      <div
        className={twMerge(
          "py-2 w-full text-center relative text-zinc-100 font-bold text-lg border-b border-zinc-800 " +
            (props.titleClassName ? props.titleClassName : "")
        )}
      >
        <motion.h1 transition={transition} animate={animationTitle}>
          {props.children[selected()][0]}
        </motion.h1>
      </div>
      <motion.div
        animate={animationContainer}
        transition={transition}
        className={props.containerClassName}
      >
        {props.children[selected()][1]}
      </motion.div>
    </div>
  );
};

export default SwipeContainer;

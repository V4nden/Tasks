import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

type Props = {
  title: string;
  children: React.ReactNode;

  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const Popup = (props: Props) => {
  return (
    <AnimatePresence mode="wait">
      {props.opened && (
        <motion.dialog
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0, 1, 0, 1] }}
          className="fixed touch-none top-0 left-0 w-full h-full p-4 z-50 bg-zinc-950/30 backdrop-blur-md flex flex-col gap-4"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-zinc-100 font-bold text-xl">{props.title}</h1>
            <button
              className="p-3 rounded-full bg-zinc-950/30 backdrop-blur-sm border border-zinc-800"
              onClick={(e) => props.setOpened(false)}
            >
              <FaX fill="#fff" size={16} />
            </button>
          </div>
          {props.children}
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

export default Popup;

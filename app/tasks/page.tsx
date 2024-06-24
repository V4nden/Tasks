"use client";
import SwipeContainer from "@/components/SwipeContainer";
import useSwipe from "@/utils/useSwipe";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const ref = React.createRef<HTMLDivElement>();
  const { x, y, est } = useSwipe(ref);
  return (
    <SwipeContainer>
      {["TEST1", <div className="text-zinc-100">TEST</div>]}
      {["TEST2", <div className="text-zinc-100">TEST2</div>]}
    </SwipeContainer>
  );
};

export default Page;

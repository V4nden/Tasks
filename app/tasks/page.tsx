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
      {["mr bro", <div className="text-zinc-100">Мне соси</div>]}
      {["mr bro2", <div className="text-zinc-100">Мне соси 21231</div>]}
      {["mr bro3", <div className="text-zinc-100">Мне соси 21231</div>]}
      {["mr bro4", <div className="text-zinc-100">Мне соси 212312</div>]}
      {["mr bro5", <div className="text-zinc-100">Мне соси 2123123123</div>]}
    </SwipeContainer>
  );
};

export default Page;

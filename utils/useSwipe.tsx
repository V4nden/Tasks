import React, { ReactNode, useEffect, useState } from "react";

const useSwipe = (ref: React.RefObject<HTMLDivElement>) => {
  let xTouchStart = 0;
  let yTouchStart = 0;
  let touchWhen = 0;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [est, setEst] = useState(0);
  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener("touchstart", (e) => {
      touchWhen = Date.now();
      xTouchStart = e.touches[0].clientX;
      yTouchStart = e.touches[0].clientY;
    });
    ref.current.addEventListener("touchend", (e) => {
      setX(e.changedTouches[0].clientX - xTouchStart);
      setY(yTouchStart - e.changedTouches[0].clientY);
      setEst(Date.now() - touchWhen);
    });

    return () => {
      ref.current?.removeEventListener("touchstart", () => {});
      ref.current?.removeEventListener("touchend", () => {});
    };
  }, [ref.current]);

  return { x, y, est };
};

export default useSwipe;

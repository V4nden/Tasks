import React, { useEffect, useState } from "react";

const useSwipe = (ref: React.RefObject<HTMLDivElement>) => {
  let xTouchStart = 0;
  let yTouchStart = 0;
  let touchWhen = 0;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [mx, setMX] = useState(0);
  const [my, setMY] = useState(0);
  const [est, setEst] = useState(0);
  const [touch, setTouch] = useState([0, 0]);
  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener("touchstart", (e) => {
      touchWhen = Date.now();
      setTouch([e.touches[0].clientX, e.touches[0].clientY]);
      xTouchStart = e.touches[0].clientX;
      yTouchStart = e.touches[0].clientY;
    });
    ref.current.addEventListener("touchmove", (e) => {
      setMX(e.changedTouches[0].clientX - xTouchStart);
      setMY(yTouchStart - e.changedTouches[0].clientY);
    });
    ref.current.addEventListener("touchend", (e) => {
      setX(e.changedTouches[0].clientX - xTouchStart);
      setMX(0);
      setY(yTouchStart - e.changedTouches[0].clientY);
      setMY(0);
      setEst(Date.now() - touchWhen);
    });

    return () => {
      ref.current?.removeEventListener("touchstart", () => {});
      ref.current?.removeEventListener("touchend", () => {});
      ref.current?.removeEventListener("touchmove", () => {});
    };
  }, [ref.current]);

  return { x, y, mx, my, est, touch };
};

export default useSwipe;

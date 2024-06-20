import React, { Ref, useEffect, useState } from "react";

const useSwipe = (el: HTMLElement | undefined) => {
  let touchStart = 0;
  const [touchEST, setTouchEST] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  let startX = 0;
  let startY = 0;

  useEffect(() => {
    if (!el) return;
    el.addEventListener("touchstart", (e) => {
      touchStart = Date.now();
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });
    el.addEventListener("touchend", (e) => {
      setTouchEST(Date.now() - touchStart);
      setScrollX(startX - e.changedTouches[0].clientX);
      setScrollY(startY - e.changedTouches[0].clientY);
    });
    return () => {
      window.removeEventListener("touchstart", () => {});
      window.removeEventListener("touchend", () => {});
    };
  }, [el]);

  return { scrollX, scrollY, touchEST };
};

export default useSwipe;

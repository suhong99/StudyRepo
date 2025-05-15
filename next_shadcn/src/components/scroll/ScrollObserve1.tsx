"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import FloatingBtn from "./FloatingBtn";

const ScrollObserve1 = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const isAboveRef = useRef(true);

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latestY) => {
    console.log(scrollY);
    if (!targetRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    const pageY = window.scrollY + rect.top;

    const isAbove = latestY < pageY;

    // 상태가 바뀔 때만 setVisible 호출
    if (isAbove !== isAboveRef.current) {
      isAboveRef.current = isAbove;
      setVisible(isAbove);
    }
  });

  return (
    <div className="relative flex flex-col">
      <div className="w-full h-[3000px] bg-amber-200">비감지영역</div>

      <FloatingBtn visible={visible} />

      <div ref={targetRef} className="text-center py-10 font-bold bg-white">
        감지 컴퍼넌트
      </div>

      <div className="w-full h-[2000px] bg-amber-700">감지 이후 영역</div>
    </div>
  );
};

export default ScrollObserve1;

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollItem = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 올라올녀석이 y축으로 위에서부터 내려와서 덮기
  const y = useTransform(scrollYProgress, [0.3, 0.5], ["100%", "0%"]);

  return (
    <section ref={ref} className="h-[180vh] bg-red-500 relative">
      {/* sticky 박스 */}
      <div className="sticky top-16 h-[calc(100vh-64px)] bg-blue-600 flex flex-col">
        {/* 붙는녀석은 항상 보이게 */}
        <div className="h-1/2 bg-amber-200 flex items-center justify-center ">
          붙는녀석
        </div>

        {/* 다음녀석 - 올라올녀석 포함 */}
        <div className="relative h-1/2 z-0 overflow-hidden">
          {/* 다음녀석 */}
          <div className="bg-amber-950 h-full flex items-center justify-center">
            다음녀석
          </div>
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-green-400 flex items-center justify-center z-10"
          >
            올라올녀석
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScrollItem;

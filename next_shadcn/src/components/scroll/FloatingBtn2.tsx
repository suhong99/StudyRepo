"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const FloatingBtn = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    const rect = targetRef.current?.getBoundingClientRect();
    if (!rect) return;

    const isIntersecting = rect.top < window.innerHeight;
    const nextVisible = !isIntersecting;

    if (nextVisible !== visible) {
      setVisible(nextVisible);
    }
  });

  return (
    <>
      <div ref={targetRef} className="h-20 bg-transparent" />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md"
          >
            FloatingBtn
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingBtn;

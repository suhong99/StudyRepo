"use client";

import { motion, AnimatePresence } from "framer-motion";

const FloatingBtn = ({ visible }: { visible: boolean }) => {
  return (
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
  );
};

export default FloatingBtn;

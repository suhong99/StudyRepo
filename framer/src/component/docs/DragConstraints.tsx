import { useRef } from "react";
import { motion } from "framer-motion";

export default function DragConstraints() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div ref={constraintsRef} style={constraints}>
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        style={box}
      />
    </motion.div>
  );
}

/**
 * ==============   Styles   ================
 */

const constraints = {
  width: 300,
  height: 300,
  backgroundColor: "#1d0330",
  borderRadius: 10,
};

const box = {
  width: 100,
  height: 100,
  backgroundColor: "#ff0088",
  borderRadius: 10,
};

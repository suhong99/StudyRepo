import { useState } from "react";
import { motion } from "framer-motion";

const LayoutWithChild = () => {
  const [isOpen, setIsOpen] = useState(false);

  const parent = {
    background: "#0f1115",
    width: isOpen ? "400px" : "100px",
    height: isOpen ? "200px" : "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 1s",
  };

  // 자식 스타일 변수
  const child = {
    width: "40px",
    height: "40px",
    background: "#f107a3",
    borderRadius: "50%",
  };

  return (
    <motion.div
      layout
      data-isOpen={isOpen}
      initial={{ borderRadius: 50 }}
      onClick={() => setIsOpen(!isOpen)}
      style={parent}
    >
      <motion.div layout transition={{ duration: 1 }} style={child} />
    </motion.div>
  );
};

export default LayoutWithChild;

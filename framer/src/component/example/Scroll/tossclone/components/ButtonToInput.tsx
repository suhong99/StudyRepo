import { useState } from "react";
import { motion } from "framer-motion";

export default function ButtonToInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  // container style
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    border: "1px solid #ccc",
    borderRadius: "9999px",
    width: isOpen ? 250 : 50,
  };

  // input style dynamic
  const inputStyle = {
    width: isOpen ? "calc(100% - 40px)" : "0px",
    transition: "width 0.3s ease, padding 0.3s ease, opacity 0.3s ease",
    padding: isOpen ? "0.5rem 1rem" : "0px",
    border: "none",
    outline: "none",
    opacity: isOpen ? 1 : 0,
    fontSize: "1rem",
  };

  // icon button style
  const buttonStyle = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
  };

  return (
    <motion.div
      layout
      style={containerStyle}
      initial={false}
      animate={{ width: isOpen ? 250 : 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <input
        autoFocus={isOpen}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => setIsOpen(false)}
        style={inputStyle}
        placeholder="검색어 입력"
      />

      <button onClick={() => !isOpen && setIsOpen(true)} style={buttonStyle}>
        🔍
      </button>
    </motion.div>
  );
}

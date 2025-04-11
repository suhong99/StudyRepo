import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FloatingCard = () => {
  const ref = useRef(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 1000, 2200], [0.3, 0.7, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "black",
        opacity,
        position: "fixed",
        top: "0px",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      FloatingCard
    </motion.div>
  );
};

export default FloatingCard;

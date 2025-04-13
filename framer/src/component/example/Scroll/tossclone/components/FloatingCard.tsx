import { motion, useScroll, useTransform } from "framer-motion";
import FloatingCardText from "./FloatingCardText";
import FloatingImg from "./FloatingImg";

const FloatingCard = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [3500, 4300], [0.7, 0]);

  return (
    <motion.div
      style={{
        width: "100%",
        height: "100vh",
        opacity,
        position: "fixed",
        top: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <FloatingImg scrollY={scrollY} />
      <motion.div
        style={{
          zIndex: 3,
          color: "red",
          fontSize: "4rem",
          textAlign: "center",
        }}
      >
        <FloatingCardText />
      </motion.div>
    </motion.div>
  );
};

export default FloatingCard;

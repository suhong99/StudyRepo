import { motion, useScroll, useTransform } from "framer-motion";
import FloatingCardText from "./FloatingCardText";

const FloatingCard = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [2000, 3400], [0.7, 0]);
  const scale = useTransform(scrollY, [400, 2000], [1, 1.3]);
  const blackOpacity = useTransform(scrollY, [0, 1500], [0.2, 0.6]);

  return (
    <motion.div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "black",
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
      <motion.img
        src="/partenon.jpg"
        alt="Floating img"
        width="100%"
        height="100%"
        style={{ scale, position: "absolute", top: "0px" }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: blackOpacity,
        }}
      />
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

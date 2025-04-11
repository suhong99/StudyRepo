import { motion, useScroll, useTransform } from "framer-motion";

const FloatingCard = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [1300, 2200], [0.7, 0]);
  const scale = useTransform(scrollY, [0, 1200], [1, 1.3]);
  const blackOpacity = useTransform(scrollY, [0, 1000], [0.2, 0.6]);
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
          fontSize: "3rem",
          textAlign: "center",
        }}
      >
        {"당신도 깊게 몰입했던 무언가가 있나요?"}
        {"첫 번쨰 줄이 올라옵니다"}
        {"두 번째 줄이 올라옵니다"}
        {"세 번째 줄이 올라옵니다"}
      </motion.div>
    </motion.div>
  );
};

export default FloatingCard;

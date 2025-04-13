import { useScroll, useTransform, motion } from "framer-motion";
import FloatingLineText from "./FloatingLineText";

const FloatingCardText = () => {
  const { scrollY } = useScroll();
  const mainTextOpacity = useTransform(scrollY, [1200, 1300], [1, 0]);

  const floatingTexts = [
    { start: 1400, text: "첫 번째 줄이 올라옵니다" },
    { start: 2100, text: "두 번째 줄이 올라옵니다" },
    { start: 2700, text: "세 번째 줄이 올라옵니다" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        color: "white",
        fontSize: "2rem",
        zIndex: 3,
      }}
    >
      <motion.div style={{ opacity: mainTextOpacity }}>
        당신도 깊게 몰입했던 <br /> 무언가가 있나요?
      </motion.div>

      {floatingTexts.map(({ start, text }) => (
        <FloatingLineText
          key={start}
          scrollY={scrollY}
          start={start}
          text={text}
        />
      ))}
    </div>
  );
};

export default FloatingCardText;

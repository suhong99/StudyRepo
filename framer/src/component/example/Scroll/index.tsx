import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ScrollEx = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // 배경이 서서히 투명해지는 애니메이션 (검은색이 0.8 -> 0.3으로)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.3)"]
  );

  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1, 1]);

  // 글자 투명도와 변경 (스크롤에 따라 내용이 변경됨)
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 1],
    [1, 0, 1, 0]
  );
  const textContent = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "1.6 수학학원",
      "1.6은 황금비율입니다.",
      "황금비율은 자연에서 아름다움을 찾는 중요한 비율입니다.",
    ]
  );

  return (
    <div style={{ height: "200vh" }}>
      <div ref={targetRef} style={{ height: "100vh" }}></div>

      {/* 검은색 배경과 학원 설명 텍스트 */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor, // 배경 색상 애니메이션 적용
          zIndex: 1, // 배경이 다른 요소 위로 가도록
        }}
      >
        <motion.h1
          style={{
            color: "white",
            fontSize: "3rem",
            opacity: textOpacity, // 텍스트 애니메이션 적용
          }}
        >
          {textContent.get()} {/* 텍스트 내용 변경 */}
        </motion.h1>
      </motion.div>

      {/* 신전 이미지 */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/partenon.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: imageOpacity, // 이미지 투명도 애니메이션
        }}
      />
    </div>
  );
};

export default ScrollEx;

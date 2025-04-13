import { motion, useTransform, MotionValue } from "framer-motion";
import React from "react";

interface FloatingImgProps {
  scrollY: MotionValue<number>;
}

const FloatingImg: React.FC<FloatingImgProps> = ({ scrollY }) => {
  const scale = useTransform(scrollY, [400, 2000], [1, 1.3]);
  const blackOpacity = useTransform(scrollY, [0, 1500], [0.2, 0.6]);

  return (
    <>
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
    </>
  );
};

export default FloatingImg;

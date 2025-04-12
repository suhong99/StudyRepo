import { motion, useTransform, MotionValue } from "framer-motion";

interface FloatingLineTextProps {
  scrollY: MotionValue<number>;
  start: number;
  text: string;
}

const FloatingLineText = ({ scrollY, start, text }: FloatingLineTextProps) => {
  const opacity = useTransform(scrollY, [start, start + 100], [0, 1]);
  const y = useTransform(scrollY, [start, start + 100], [30, 0]);

  return (
    <motion.div style={{ opacity, y, marginTop: "1.5rem" }}>{text}</motion.div>
  );
};

export default FloatingLineText;

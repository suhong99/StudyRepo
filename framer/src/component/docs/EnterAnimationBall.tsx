import { motion } from 'framer-motion';

export default function EnterAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }} // import { AnimatePresence } from 'framer-motion'; 이 wrapper로 감싸져 있어야 함
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
      style={ball}
    />
  );
}

/**
 * ==============   Styles   ================
 */

const ball = {
  width: 100,
  height: 100,
  backgroundColor: '#dd00ee',
  borderRadius: '50%',
};

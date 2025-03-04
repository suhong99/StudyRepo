import { motion } from 'framer-motion';
const TimesTest = () => {
  return (
    <div>
      <motion.div
        animate={{
          x: [0, 100, 0],
          transition: { duration: 4, times: [0, 0.1, 1] },
        }}
        style={{
          backgroundColor: 'red',
          width: 100,
          height: 100,
        }}
      />
      ㅎㅇ
    </div>
  );
};

export default TimesTest;

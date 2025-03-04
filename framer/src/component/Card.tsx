import { useState } from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const TCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="card"
      initial="initial"
      animate={isHovered ? 'hover' : 'initial'}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 기본 상태 (제목 + 플러스 아이콘) */}
      <motion.div
        className="card-default"
        animate={isHovered ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="title">소식지 제목</h2>
        <PlusIcon />
      </motion.div>

      {/* 호버 상태 (카테고리 + 제목 + 상세 설명) */}
      <motion.div
        className="card-hover"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <p className="category">카테고리: 뉴스</p>
        <h2 className="hover-title">소식지 제목</h2>
        <p className="description">이곳에 상세 설명이 들어갑니다.</p>
      </motion.div>
    </motion.div>
  );
};
export default TCard;

const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="line-icon"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path
        d="M12 23.2C5.8 23.2.8 18.2.8 12S5.8.8 12 .8s11.2 5 11.2 11.2-5 11.2-11.2 11.2zm0-21c-5.4 0-9.8 4.4-9.8 9.8s4.4 9.8 9.8 9.8 9.8-4.4 9.8-9.8-4.4-9.8-9.8-9.8z"
        fill="#6b7684"
      ></path>
      <g fill="#6b7684">
        <path d="M17 12.8H7c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h10c.4 0 .8.3.8.8s-.4.8-.8.8z"></path>
        <path d="M12 17.8c-.4 0-.8-.3-.8-.8V7c0-.4.3-.8.8-.8s.8.3.8.8v10c-.1.4-.4.8-.8.8z"></path>
      </g>
    </svg>
  );
};

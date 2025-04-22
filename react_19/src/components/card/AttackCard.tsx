import React, { useState } from "react";

const AttackCard: React.FC<{ content: React.ReactNode }> = ({ content }) => {
  const [isAttacking, setIsAttacking] = useState(false);

  const handleClick = () => {
    if (isAttacking) return;

    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 400); // 복귀 타이밍
  };

  const wrapperStyle: React.CSSProperties = {
    width: "120px",
    height: "160px",
    perspective: "1200px",
    cursor: "pointer",
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.3s ease",
    transform: isAttacking
      ? "rotateX(15deg) translateY(-100px) scale(0.7)"
      : "rotateX(0deg) translateY(0px) scale(1)",
    background: "white",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: isAttacking
      ? "0 12px 24px rgba(0, 0, 0, 0.35)"
      : "0 4px 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    userSelect: "none",
  };

  return (
    <div style={wrapperStyle} onClick={handleClick}>
      <div style={cardStyle}>{content}</div>
    </div>
  );
};

export default AttackCard;

import React, { useState } from "react";
import "./flipCard.css";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <div className="card-front">{front}</div>
        <div className="card-back">{back}</div>
      </div>
    </div>
  );
};

export default FlipCard;

import React from 'react';

interface CardProps {
  title: string;
  description: string;
  category: string;
  date: string;
}

const Card: React.FC<CardProps> = ({ title, description, category, date }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        maxWidth: '300px',
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <small>Category: {category}</small>
      <br />
      <small>Date: {date}</small>
    </div>
  );
};

export default Card;

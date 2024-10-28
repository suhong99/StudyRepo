import React from 'react';

import Card from './Card';
import { Data } from '../dummy/data';

const CardList: React.FC<{ list: Data[] }> = ({ list }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
      }}
    >
      {list.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
          category={item.category}
          date={item.date}
        />
      ))}
    </div>
  );
};

export default CardList;

import React, { useReducer, useState } from 'react';
//

const Reducer = () => {
  //before
  const [fold, setFold] = useState(true);
  const toggleFold = () => {
    setFold((prev) => !prev);
  };

  //after
  const [fold2, toggleFold2] = useReducer((v) => !v, true);
  return <div>Reducer</div>;
};

export default Reducer;

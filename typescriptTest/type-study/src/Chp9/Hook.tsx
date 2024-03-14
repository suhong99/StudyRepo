import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const Hook = () => {
  const [state, setState] = useState('');
  useEffect(() => {}, []);
  useLayoutEffect(() => {}, []);
  const ref = useRef<HTMLInputElement>(null);
  return <div>Hook</div>;
};

export default Hook;

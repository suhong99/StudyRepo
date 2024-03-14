import React, { forwardRef } from 'react';

interface Props {
  name: string;
}
const TestInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div>
      <label>{props.name}</label>
      <input ref={ref} />
    </div>
  );
});

export default TestInput;

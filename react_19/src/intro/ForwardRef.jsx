import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}


// 특정 기능만 제한하고 싶을 떄
import {
    forwardRef,
    useRef,
    useImperativeHandle
  } from 'react';
  
  const MyInput2 = forwardRef((props, ref) => {
    const realInputRef = useRef(null);
    useImperativeHandle(ref, () => ({
      // 오직 focus만 노출합니다.
      focus() {
        realInputRef.current.focus();
      },
    }));
    return <input {...props} ref={realInputRef} />;
  });
  
  export default function Form() {
    const inputRef = useRef(null);
  
    function handleClick() {
      inputRef.current.focus();
    }
  
    return (
      <>
        <MyInput ref={inputRef} />
        <button onClick={handleClick}>
          Focus the input
        </button>
      </>
    );
  }
  
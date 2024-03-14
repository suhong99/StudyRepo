import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// function useEffect(effect: EffectCallback, deps?: DependencyList): void;
// function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;

// type EffectCallback = () => void | Destructor;
// type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
// type DependencyList = readonly unknown[];

// useMemo
// useCallback

import React from 'react';

const Hook = () => {
  const [state, setState] = useState('');
  useEffect(() => {}, []);
  useLayoutEffect(() => {}, []);
  const ref = useRef<HTMLInputElement>(null);
  const mutableRef = useRef<HTMLInputElement | null>(null);
  return <div>Hook</div>;
};

export default Hook;

// function useRef<T>(initialValue: T): MutableRefObject<T>;

// function useRef<T>(initialValue: T | null): RefObject<T>;

// function useRef<T = undefined>(): MutableRefObject<T | undefined>;

// const JobCreateForm : React.ForwardRefRenderFunction<CreateFormHandle, CreateFormProps>= (props,ref)=>{
//   useImperativeHandle(ref,()=>({
//     submit:()=>{
//       //
//     }
//   }))
// }

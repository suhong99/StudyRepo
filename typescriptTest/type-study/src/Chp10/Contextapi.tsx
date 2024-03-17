import React, { useContext } from 'react';

type Nullable<T> = T | null;
type Consumer<C> = () => C;

export interface ContextInterface<S> {
  state: S;
}

export function createContext<S, C = ContextInterface<S>>(): readonly [
  React.FC<C>,
  Consumer<C>
] {
  const context = React.createContext<Nullable<C>>(null);

  const Provider: React.FC<C> = ({ children, ...otherProps }) => {
    return (
      <context.Provider value={otherProps as C}>{children}</context.Provider>
    );
  };

  const useCustomContext: Consumer<C> = () => {
    const _context = useContext(context);
    if (!_context) {
      throw new Error('Context not found');
    }

    return _context;
  };

  return [Provider, useCustomContext];
}

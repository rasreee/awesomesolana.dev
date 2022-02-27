import React, { ReactElement, useContext } from 'react';

const StoreContext = React.createContext(null);

export const useStore = <T,>(): T => {
  const value = useContext(StoreContext);

  if (value === null) {
    throw new Error('useStore must be used within StoreContext');
  }

  return value;
};

interface IProps<T> {
  store: T;
}

export const StoreProvider = <T,>(
  props: React.PropsWithChildren<IProps<T>>,
): ReactElement => {
  return (
    <StoreContext.Provider value={props.store as any}>
      {props.children}
    </StoreContext.Provider>
  );
};

StoreProvider.displayName = 'StoreProvider';
StoreProvider.defaultProps = {};

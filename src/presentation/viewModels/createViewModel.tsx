import React, { createContext, Dispatch, useContext, useReducer } from 'react';

type ViewModelContext<S, A> = {
  state: S;
  dispatch: Dispatch<A>;
};

export function createViewModel<S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S,
) {
  const Context = createContext<ViewModelContext<S, A> | undefined>(undefined);

  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  };

  const useViewModel = (): ViewModelContext<S, A> => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useViewModel must be used within its Provider');
    }
    return context;
  };

  return { Provider, useViewModel };
}

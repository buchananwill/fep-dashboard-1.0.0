import { createContext, useContext } from 'react';

export interface TextAccessorContextInterface<T> {
  accessor: (entity: T) => string;
}

export const TextAccessorContext = createContext<
  TextAccessorContextInterface<any>
>({ accessor: (entity: any) => '' });

export function useTextAccessor<T>() {
  return useContext<TextAccessorContextInterface<T>>(TextAccessorContext);
}

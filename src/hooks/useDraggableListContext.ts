import { createContext, useContext, useMemo } from 'react';

export type DraggableListContextInterface = {
  listName: string;
};

const DefaultContext: DraggableListContextInterface = {
  listName: 'list'
};

export const DraggableListContext = createContext(DefaultContext);

export function useDraggableListContext(index: number) {
  const { listName } = useContext(DraggableListContext);
  return useMemo(() => ({ listName, index }), [index, listName]);
}

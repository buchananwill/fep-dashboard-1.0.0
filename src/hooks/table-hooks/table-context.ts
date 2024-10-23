import { createContext, useContext } from 'react';

const DefaultEntityTableContext = {
  entityClass: '',
  hideFiltering: false
};

export type EntityTableContextInterface = typeof DefaultEntityTableContext;

export const EntityTableContext = createContext<EntityTableContextInterface>(
  DefaultEntityTableContext
);

export function useEntityTableContext() {
  return useContext(EntityTableContext);
}

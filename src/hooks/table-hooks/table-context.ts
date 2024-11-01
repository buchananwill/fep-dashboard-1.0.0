import { createContext, useContext } from 'react';
import { TableSelectionMode } from '@/components/tables/core-table-types';

const DefaultEntityTableContext = {
  entityClass: '',
  hideFiltering: false,
  withSelection: 'none' as TableSelectionMode
};

export type EntityTableContextInterface = typeof DefaultEntityTableContext;

export const EntityTableContext = createContext<EntityTableContextInterface>(
  DefaultEntityTableContext
);

export function useEntityTableContext() {
  return useContext(EntityTableContext);
}

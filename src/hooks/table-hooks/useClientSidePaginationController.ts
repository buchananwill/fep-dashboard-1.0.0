import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGlobalController, useGlobalListener } from 'selective-context';
import {
  getFilteredIdContextKey,
  getSetPageContextKey
} from '@/hooks/table-hooks/useClientSideFilteringIdList';
import { EmptyArray } from '@/api/literals';
import { Identifier } from 'dto-stores';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';

const listenerKey = 'pagination';

export function getRowsPerPageContextKey(contextNamespace: string) {
  return `${contextNamespace}:rowsPerPage`;
}

export function useClientSidePaginationController() {
  const { entityClass } = useEntityTableContext();
  // Set up pagination
  const { currentState: rowsPerPage } = useGlobalListener({
    contextKey: getRowsPerPageContextKey(entityClass),
    listenerKey: listenerKey,
    initialValue: 10
  });
  const { currentState: page, dispatch: setPage } = useGlobalController({
    contextKey: getSetPageContextKey(entityClass),
    listenerKey,
    initialValue: 0
  });
  useEffect(() => {
    if (rowsPerPage) setPage(1);
  }, [rowsPerPage, setPage]);
  const { currentState: filteredIdList } = useGlobalListener({
    contextKey: getFilteredIdContextKey(entityClass),
    initialValue: EmptyArray as Identifier[],
    listenerKey
  });

  const { length } = filteredIdList;

  console.log({ filteredIdList, length, entityClass });

  const pages = useMemo(() => {
    return Math.ceil(length / rowsPerPage);
  }, [length, rowsPerPage]);

  return { page, setPage, pages };
}

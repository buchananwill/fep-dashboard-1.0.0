'use client';
import { useGlobalController, useGlobalListener } from 'selective-context';
import SortableHeaderCell, {
  getSortContextKey
} from '@/components/tables/cells-v2/SortableHeaderCell';
import SelectVisibleColumns, {
  getOrderedColumnsContextKey
} from '@/components/tables/SelectVisibleColumns';
import SelectFilterPath, {
  getVisibleColumnsContextKey
} from '@/components/tables/SelectFilterPath';
import { getFilteredSortedIdListContextKey } from '@/hooks/table-hooks/useClientSideSorting';
import { EmptyArray } from '@/api/literals';
import { getSetPageContextKey } from '@/hooks/table-hooks/useClientSideFilteringIdList';
import { getRowsPerPageContextKey } from '@/hooks/table-hooks/useClientSidePaginationController';
import React, { useMemo } from 'react';
import { EntityTableContext } from '@/hooks/table-hooks/table-context';
import {
  CoreTableProps,
  SortState
} from '@/components/tables/core-table-types';
import SortingController from '@/components/tables/SortingController';
import FilterStringInput from '@/components/generic/FilterStringInput';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import SelectRowsPerPage from '@/components/tables/SelectRowsPerPage';
import DtoPagination from '@/components/generic/DtoPagination';
import { ScrollArea, TableProps } from '@mantine/core';
import CoreTable from '@/components/tables/CoreTable';
import { Identifier } from 'dto-stores';
import { HasIdClass } from '@/api/types';
import { compactTableStyles } from '@/components/tables/edit-tables/KnowledgeDomainTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';
import { useUserGuideTooltip } from '@/components/user-guide/user-guide-tool-tip/UserGuideToolTip';
import { singular } from 'pluralize';
import { kebabCase } from 'lodash';

export default function EntityTable<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier
>({
  columns,
  defaultSort = Sorts.none,
  entityClass,
  styles,
  headerModel,
  withSelection = 'none',
  hideFiltering = false,
  ...props
}: {
  defaultSort?: SortState<T>;
  entityClass: string;
  hideFiltering?: boolean;
} & Omit<CoreTableProps<T, T_ID>, 'rowIdList'> &
  Omit<TableProps, 'data'>) {
  const listenerKey = `${entityClass}:table`;

  useGlobalController({
    contextKey: getSortContextKey(entityClass),
    initialValue: defaultSort,
    listenerKey
  });

  useGlobalController({
    contextKey: getOrderedColumnsContextKey(entityClass),
    initialValue: columns,
    listenerKey
  });

  const { currentState: visibleColumns } = useGlobalController({
    contextKey: getVisibleColumnsContextKey(entityClass),
    initialValue: columns,
    listenerKey
  });
  const { currentState: filteredSortedIdList } = useGlobalListener({
    contextKey: getFilteredSortedIdListContextKey(entityClass),
    initialValue: EmptyArray as T_ID[],
    listenerKey
  });

  const { currentState: selectedPage } = useGlobalListener({
    contextKey: getSetPageContextKey(entityClass),
    initialValue: 1,
    listenerKey
  });

  const { currentState: rowsPerPage } = useGlobalListener({
    contextKey: getRowsPerPageContextKey(entityClass),
    listenerKey: listenerKey,
    initialValue: 10
  });

  const visibleIdList = useMemo(() => {
    return filteredSortedIdList.slice(
      (selectedPage - 1) * rowsPerPage,
      (selectedPage - 1) * rowsPerPage + rowsPerPage
    );
  }, [filteredSortedIdList, selectedPage, rowsPerPage]);

  const contextValue = useMemo(() => {
    return {
      entityClass: entityClass,
      hideFiltering: hideFiltering ?? false,
      withSelection
    };
  }, [entityClass, hideFiltering, withSelection]);

  const tooltipProps = useUserGuideTooltip(entityClass);

  return (
    <EntityTableContext.Provider value={contextValue}>
      <SortingController />
      <div className={'flex flex-col gap-2 p-2'} {...tooltipProps}>
        {!hideFiltering && (
          <div className={'grid grid-cols-3 gap-2'}>
            <FilterStringInput />
            <SelectFilterPath<KnowledgeDomainDto> initialFilter={'name'} />
            <SelectVisibleColumns />
          </div>
        )}
        <div className={'flex items-end justify-between gap-2'}>
          <SelectRowsPerPage />
          <DtoPagination />
        </div>
      </div>
      <ScrollArea classNames={{ root: 'border-2 rounded-md' }}>
        <CoreTable
          {...props}
          styles={styles ?? compactTableStyles}
          headerModel={headerModel ?? SortableHeaderCell}
          rowIdList={visibleIdList}
          columns={visibleColumns}
          withSelection={withSelection}
        />
      </ScrollArea>
    </EntityTableContext.Provider>
  );
}

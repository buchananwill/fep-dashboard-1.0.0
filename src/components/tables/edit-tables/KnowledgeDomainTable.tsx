'use client';
import React, { memo, useMemo } from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID, EmptyArray } from '@/api/literals';
import { getDomainAlias } from '@/api/getDomainAlias';
import { set, startCase } from 'lodash';
import { Column } from '@/types';
import {
  ColorDto,
  KnowledgeDomainDto
} from '@/api/generated-types/generated-types';
import { getCellRenderFunction } from '@/components/tables/cells-v2/GetCellRenderFunction';
import {
  SimpleValueToString,
  SimpleValueToStringOrUndefined
} from '@/components/tables/cells-v2/SimpleValueToString';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import CoreTable from '@/components/tables/CoreTable';
import { NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import EditColorCell from '@/components/tables/cells-v2/EditColorCell';
import { OptionallyHasColorDto } from '@/components/tables/cells/EditColorCell';
import { TypedPaths } from '@/api/custom-types/typePaths';
import FilterStringInput from '@/components/generic/FilterStringInput';
import { ScrollArea } from '@mantine/core';
import DtoPagination from '@/components/generic/DtoPagination';
import SortableHeaderCell, {
  getSortContextKey
} from '@/components/tables/cells-v2/SortableHeaderCell';
import { EntityTableContext } from '@/hooks/table-hooks/table-context';
import { useGlobalController, useGlobalListener } from 'selective-context';
import SortingController from '@/components/tables/SortingController';
import SelectFilterPath, {
  getVisibleColumnsContextKey
} from '@/components/tables/SelectFilterPath';
import { getFilteredSortedIdListContextKey } from '@/hooks/table-hooks/useClientSideSorting';
import { getSetPageContextKey } from '@/hooks/table-hooks/useClientSideFilteringIdList';
import { getRowsPerPageContextKey } from '@/hooks/table-hooks/useClientSidePaginationController';
import SelectRowsPerPage from '@/components/tables/SelectRowsPerPage';

const entityClass = EntityClassMap.knowledgeDomain;

const listenerKey = 'kdTable';

const defaultKnowledgeDomainSort = { direction: 'asc', path: 'name' };

export function KnowledgeDomainTable() {
  // const createHandler = useMasterListToCreate(domainFactory, entityType);

  useGlobalController({
    contextKey: getSortContextKey(entityClass),
    initialValue: defaultKnowledgeDomainSort,
    listenerKey
  });

  useGlobalController({
    contextKey: getVisibleColumnsContextKey(entityClass),
    initialValue: columns,
    listenerKey
  });

  const { currentState: idList } = NamespacedHooks.useListen(
    entityClass,
    KEY_TYPES.ID_LIST,
    listenerKey,
    EmptyArray
  );

  const { currentState: filteredSortedIdList } = useGlobalListener({
    contextKey: getFilteredSortedIdListContextKey(entityClass),
    initialValue: EmptyArray as number[],
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

  return (
    <div className={'flex h-[75vh] flex-col gap-2 p-2'}>
      <EntityTableContext.Provider
        value={{ entityClass: EntityClassMap.knowledgeDomain }}
      >
        <SortingController />
        <div className={'flex items-end gap-2'}>
          <FilterStringInput entityClass={entityClass} />
          <SelectFilterPath<KnowledgeDomainDto> initialFilter={'name'} />
        </div>
        <div className={'flex items-end gap-2'}>
          <SelectRowsPerPage />
          <DtoPagination />
        </div>
        <ScrollArea classNames={{ root: 'border-2 rounded-md' }}>
          <CoreTableMemo
            stickyHeader
            headerModel={SortableHeaderCell}
            styles={{
              td: { paddingTop: 0, paddingBottom: 0 },
              th: { padding: 0 }
            }}
            rowIdList={visibleIdList}
            columns={columns}
            cellModel={CellRenderFunction}
          />
        </ScrollArea>
      </EntityTableContext.Provider>
    </div>
  );
}

const CoreTableMemo = memo(CoreTable<KnowledgeDomainDto, number>);

const getDomainFactory = () => {
  let nextId = ABSOLUTE_SMALLEST_TRANSIENT_ID;
  return function () {
    const newDomain: KnowledgeDomainDto = {
      id: nextId,
      name: `${getDomainAlias('knowledgeDomain')} ${nextId * -1}`
    };
    nextId--;
    return newDomain;
  };
};

const domainFactory = getDomainFactory();

const columns: Column<KnowledgeDomainDto>[] = [
  {
    name: startCase(getDomainAlias('knowledgeDomain')),
    uid: 'name',
    sortable: true
  },
  { name: 'ShortCode', uid: 'shortCode', sortable: true },
  { name: 'Color', uid: 'color', sortable: false }
];

const entityType = entityClass;

function ColorUpdater<T extends OptionallyHasColorDto>(
  prev: T,
  color: ColorDto | undefined
) {
  return {
    ...prev,
    color
  };
}

function getStringUpdater<
  T extends Object,
  T_STRING_PATH extends string & TypedPaths<T, string> = string &
    TypedPaths<T, string>
>(stringPath: T_STRING_PATH) {
  return (prev: T, value: string) =>
    set(structuredClone(prev), stringPath, value);
}

const knowledgeCells: CellComponentRecord<KnowledgeDomainDto, number> = {
  name: {
    component: SimpleValueToString,
    updater: getStringUpdater('name'),
    type: 'IdInnerCell'
  },
  shortCode: { component: SimpleValueToStringOrUndefined, type: 'IdInnerCell' },
  color: {
    component: EditColorCell,
    updater: ColorUpdater,
    type: 'IdInnerCell'
  }
};

const CellRenderFunction = getCellRenderFunction(
  'knowledgeDomain',
  knowledgeCells
);

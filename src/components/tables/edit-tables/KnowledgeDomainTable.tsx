'use client';
import React from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID, EmptyArray } from '@/api/literals';
import { getDomainAlias } from '@/api/getDomainAlias';
import { set, startCase } from 'lodash';
import { Column, ColumnUid } from '@/types';
import {
  ColorDto,
  KnowledgeDomainDto
} from '@/api/generated-types/generated-types';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import { useMasterListToCreate } from '@/hooks/useMasterListToCreate';
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
import { HasIdClass } from '@/api/types';
import { Paths } from 'type-fest';
import { TypedPaths } from '@/api/custom-types/typePaths';

export function KnowledgeDomainTable() {
  // const entities = useFilterOutDeletedEntities<KnowledgeDomainDto>(entityType);

  // const createHandler = useMasterListToCreate(domainFactory, entityType);

  const { currentState: idList } = NamespacedHooks.useListen(
    EntityClassMap.knowledgeDomain,
    KEY_TYPES.ID_LIST,
    'kdTable',
    EmptyArray
  );

  return (
    <CoreTable
      rowIdList={idList}
      columns={columns}
      cellModel={CellRenderFunction}
    />
  );
}

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

const entityType = EntityClassMap.knowledgeDomain;

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
  name: { component: SimpleValueToString, updater: getStringUpdater('name') },
  shortCode: { component: SimpleValueToStringOrUndefined },
  color: {
    component: EditColorCell,
    updater: ColorUpdater
  }
};

const CellRenderFunction = getCellRenderFunction(
  'knowledgeDomain',
  knowledgeCells
);

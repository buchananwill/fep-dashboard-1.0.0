'use client';
import React, { memo } from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { getDomainAlias } from '@/api/getDomainAlias';
import { set, startCase } from 'lodash';
import { Column } from '@/types';
import {
  ColorDto,
  KnowledgeDomainDto
} from '@/api/generated-types/generated-types';
import { getCellRenderFunction } from '@/components/tables/cells-v2/GetCellRenderFunction';
import {
  CellComponentRecord,
  IdInnerCell
} from '@/components/tables/core-table-types';
import CoreTable from '@/components/tables/CoreTable';
import EditColorCell from '@/components/tables/cells-v2/EditColorCell';
import { OptionallyHasColorDto } from '@/components/tables/cells/EditColorCell';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { EntityTableContext } from '@/hooks/table-hooks/table-context';
import EditNameCell from '@/components/tables/cells-v2/EditNameCell';
import EditShortCodeCell from '@/components/tables/cells-v2/EditShortCodeCell';
import EntityEditTable from '@/components/tables/edit-tables/EntityEditTable';

const entityClass = EntityClassMap.knowledgeDomain;

const listenerKey = 'kdTable';

const defaultKnowledgeDomainSort = { direction: 'asc', path: 'name' } as const;

export function KnowledgeDomainTable() {
  // const createHandler = useMasterListToCreate(domainFactory, entityType);

  return (
    <div className={'flex h-[75vh] flex-col gap-2 p-2'}>
      <EntityTableContext.Provider
        value={{ entityClass: EntityClassMap.knowledgeDomain }}
      >
        <EntityEditTable
          defaultSort={defaultKnowledgeDomainSort}
          columns={columns}
          cellModel={CellRenderFunction}
        />
      </EntityTableContext.Provider>
    </div>
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
  {
    name: 'ShortCode',
    uid: 'shortCode',
    sortable: true,
    className: 'w-16'
  },
  { name: 'Color', uid: 'color', sortable: false, className: 'w-16' }
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
    component: EditNameCell,
    updater: getStringUpdater('name'),
    type: 'IdInnerCell'
  },
  shortCode: {
    component: EditShortCodeCell as IdInnerCell<string | undefined>,
    updater: (prev: KnowledgeDomainDto, value: string | undefined) =>
      set(
        structuredClone(prev),
        'shortCode',
        value?.trim() === '' ? undefined : value
      ),
    type: 'IdInnerCell'
  },
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

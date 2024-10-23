'use client';
import React from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { getDomainAlias } from '@/api/getDomainAlias';
import { set, startCase } from 'lodash';
import { Column } from '@/types';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { getCellRenderFunction } from '@/components/tables/cells-v2/GetCellRenderFunction';
import {
  CellComponentRecord,
  IdInnerCell
} from '@/components/tables/core-table-types';
import EditColorCell from '@/components/tables/cells-v2/EditColorCell';
import EditNameCell from '@/components/tables/cells-v2/EditNameCell';
import EditShortCodeCell from '@/components/tables/cells-v2/EditShortCodeCell';
import EntityEditTable from '@/components/tables/edit-v2/EntityEditTable';
import {
  ColorUpdater,
  getStringUpdater
} from '@/components/tables/edit-v2/cellUpdaterFunctions';

const entityClass = EntityClassMap.knowledgeDomain;

const defaultKnowledgeDomainSort = { direction: 'asc', path: 'name' } as const;

export const compactTableStyles = {
  td: { paddingTop: 0, paddingBottom: 0 },
  th: { padding: 0 }
};

export function KnowledgeDomainTable() {
  // const createHandler = useMasterListToCreate(domainFactory, entityType);

  return (
    <div className={'flex h-[75vh] flex-col gap-2 p-2'}>
      <EntityEditTable
        defaultSort={defaultKnowledgeDomainSort}
        stickyHeader
        withRowBorders
        styles={compactTableStyles}
        columns={columns}
        cellModel={CellRenderFunction}
        entityClass={entityClass}
      />
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

import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { StringValueChip } from '@/components/tables/StringValueChip';
import { EntityClassMap } from '@/api/entity-class-map';
import { EntityTableProps } from '@/components/tables/types';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { Column, ColumnUid } from '@/types';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { getDomainAlias } from '@/api/getDomainAlias';
import React from 'react';
import { startCase } from 'lodash';

export const KnowledgeDomainReadOnlyCell = getCellRenderFunction(
  {
    name: SimpleValueToString,
    shortCode: StringValueChip
  },
  EntityClassMap.knowledgeDomain
);

export default function KnowledgeDomainSelectorTable({
  entities
}: EntityTableProps<'knowledgeDomain'>) {
  return (
    <>
      <FilterSelectEntityTable
        entities={entities}
        initialColumns={KnowledgeDomainInitialColumns}
        filterProperty={'name'}
        renderCell={KnowledgeDomainReadOnlyCell}
        columns={KnowledgeDomainColumns}
        entityClass={EntityClassMap.knowledgeDomain}
        idClass={'number'}
      />
    </>
  );
}

export const KnowledgeDomainInitialColumns: ColumnUid<KnowledgeDomainDto>[] = [
  'name',
  'shortCode'
];
export const KnowledgeDomainColumns: Column<KnowledgeDomainDto>[] = [
  {
    name: startCase(getDomainAlias('knowledgeDomain')),
    uid: 'name',
    sortable: true
  },
  { name: 'Id', uid: 'id', sortable: false },

  { name: 'ShortCode', uid: 'shortCode' }
];

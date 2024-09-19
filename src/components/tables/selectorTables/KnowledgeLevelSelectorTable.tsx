import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { StringValueChip } from '@/components/tables/StringValueChip';
import { EntityClassMap } from '@/api/entity-class-map';
import { EntityTableProps } from '@/components/tables/types';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { Column, ColumnUid } from '@/types';
import { KnowledgeLevelDto } from '@/api/generated-types/generated-types';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import React from 'react';

export const KnowledgeLevelReadOnlyCell = getCellRenderFunction<
  'knowledgeLevel',
  KnowledgeLevelDto
>(
  {
    name: SimpleValueToString,
    levelOrdinal: StringValueChip
  },
  EntityClassMap.knowledgeLevel
);

export default function KnowledgeLevelSelectorTable({
  entities
}: EntityTableProps<'knowledgeLevel'>) {
  return (
    <>
      <FilterSelectEntityTable
        entities={entities}
        initialColumns={KnowledgeLevelInitialColumns}
        filterProperty={'name'}
        renderCell={KnowledgeLevelReadOnlyCell}
        columns={KnowledgeLevelColumns}
        entityClass={EntityClassMap.knowledgeLevel}
        idClass={'number'}
      />
    </>
  );
}

export const KnowledgeLevelInitialColumns: ColumnUid<KnowledgeLevelDto>[] = [
  'name',
  'levelOrdinal'
];
export const KnowledgeLevelColumns: Column<KnowledgeLevelDto>[] = [
  {
    name: getStartCaseDomainAlias('knowledgeLevel'),
    uid: 'name',
    sortable: true
  },
  { name: 'Id', uid: 'id', sortable: false },

  { name: getStartCaseDomainAlias('levelOrdinal'), uid: 'levelOrdinal' }
];

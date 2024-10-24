import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { StringValueChip } from '@/components/tables/StringValueChip';
import { EntityClassMap } from '@/api/entity-class-map';
import { EntityTableProps } from '@/components/tables/types';
import { Column } from '@/types';
import { KnowledgeLevelDto } from '@/api/generated-types/generated-types';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import React from 'react';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { getCellRenderFunction } from '../cells-v2/GetCellRenderFunction';
import { AnyValueToString } from '@/components/tables/cells-v2/AnyValueToString';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

export const KnowledgeLevelReadOnlyCell = getCellRenderFunction<
  'knowledgeLevel',
  KnowledgeLevelDto
>('knowledgeLevel', {
  name: { type: 'IdInnerCell', component: AnyValueToString },
  levelOrdinal: { type: 'IdInnerCell', component: AnyValueToString },
  knowledgeLevelSeriesId: { type: 'IdInnerCell', component: AnyValueToString }
});

export default function KnowledgeLevelSelectorTable({
  entities
}: EntityTableProps<'knowledgeLevel'>) {
  return (
    <>
      <EntityTable
        cellModel={KnowledgeLevelReadOnlyCell}
        withSelection={'multiple'}
        columns={KnowledgeLevelColumns}
        entityClass={EntityClassMap.knowledgeLevel}
        defaultSort={Sorts.name}
      />
    </>
  );
}

const KnowledgeLevelColumns: Column<KnowledgeLevelDto>[] = [
  {
    name: getStartCaseDomainAlias('knowledgeLevel'),
    uid: 'name',
    sortable: true
  },
  {
    name: getStartCaseDomainAlias('levelOrdinal'),
    uid: 'levelOrdinal',
    sortable: true
  },
  {
    name: getStartCaseDomainAlias('knowlegeLevelSeries'),
    uid: 'knowledgeLevelSeriesId',
    sortable: true
  }
];

import { EntityClassMap } from '@/api/entity-class-map';
import { EntityTableProps } from '@/components/tables/types';
import { Column } from '@/types';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { getDomainAlias } from '@/api/getDomainAlias';
import React from 'react';
import { startCase } from 'lodash';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { KnowledgeDomainReadOnlyCellModel } from '@/components/tables/cells-v2/KnowledgeDomainReadOnlyCellModel';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

export default function KnowledgeDomainSelectorTable({
  entities
}: EntityTableProps<'knowledgeDomain'>) {
  return (
    <>
      <EntityTable
        defaultSort={Sorts.name}
        cellModel={KnowledgeDomainReadOnlyCellModel}
        columns={KnowledgeDomainColumns}
        entityClass={EntityClassMap.knowledgeDomain}
        withSelection
      />
    </>
  );
}

export const KnowledgeDomainColumns: Column<KnowledgeDomainDto>[] = [
  {
    name: startCase(getDomainAlias('knowledgeDomain')),
    uid: 'name',
    sortable: true
  },
  {
    name: 'ShortCode',
    uid: 'shortCode',
    sortable: true,
    style: { width: '12em' }
  }
];

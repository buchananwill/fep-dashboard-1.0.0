'use client';
import React from 'react';

import { Column, ColumnUid } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { OrganizationDto } from '@/api/generated-types/generated-types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { getCellRenderFunction } from '@/components/tables/cells-v2/GetCellRenderFunction';
import { AnyValueToString } from '@/components/tables/cells-v2/AnyValueToString';

export default function OrganizationSelectorTable({
  entities
}: {
  entities: OrganizationDto[];
}) {
  return (
    <>
      <EntityTable
        withSelection={'multiple'}
        cellModel={OrganizationCellModel}
        columns={OrganizationColumns}
        entityClass={EntityClassMap.organization}
      />
    </>
  );
}

export const OrganizationColumnsInitial: ColumnUid<OrganizationDto>[] = [
  'name',
  'type.name'
];

export const OrganizationColumns: Column<OrganizationDto>[] = [
  { name: 'Name', uid: 'name', sortable: true },
  { name: 'Type', uid: 'type.name', sortable: true }
];

const OrganizationCellModel = getCellRenderFunction<
  'organization',
  OrganizationDto
>('organization', {
  name: { type: 'IdInnerCell', component: AnyValueToString },
  'type.name': { type: 'IdInnerCell', component: AnyValueToString }
});

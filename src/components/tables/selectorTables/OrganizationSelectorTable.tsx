'use client';
import React, { useCallback } from 'react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';

import { Column, ColumnUid } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { getValue } from '@/functions/allowingNestedFiltering';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { OrganizationDto } from '@/api/generated-types/generated-types';

export default function OrganizationSelectorTable({
  entities
}: {
  entities: OrganizationDto[];
}) {
  const renderCell = useCallback(
    (organization: OrganizationDto, columnKey: React.Key) => {
      const cellValue =
        organization[
          columnKey as Extract<
            keyof Omit<OrganizationDto, 'type' | 'workSchemaNodeAssignment'>,
            string | number
          >
        ];

      const entityKey = columnKey as TypedPaths<
        OrganizationDto,
        string | undefined
      >;

      switch (columnKey) {
        case 'name':
          return (
            <div className={'inline-block w-32 truncate'}>
              {organization.name}
            </div>
          );
        case 'type.name': {
          return (
            <div className={'inline-block w-32 truncate'}>
              {getValue(organization, entityKey)}
            </div>
          );
        }
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <FilterSelectEntityTable
        entities={entities}
        initialColumns={OrganizationColumnsInitial}
        filterProperty={'name'}
        renderCell={renderCell}
        columns={OrganizationColumns}
        entityClass={EntityClassMap.organization}
        idClass={'number'}
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

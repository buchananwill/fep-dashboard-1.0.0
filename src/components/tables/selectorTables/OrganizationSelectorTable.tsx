'use client';
import React, { useCallback } from 'react';
import FilterSelectEntityTable from '@/components/generic/FilterSelectEntityTable';

import { Column } from '@/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { getValue } from '@/functions/allowingNestedFiltering';
import { StringPathsNoDeepOptionals } from '@/functions/chatGptTriesToStringPath';
import { TypedPaths } from '@/functions/typePaths';
import { OrganizationDto } from '@/api/generated-types/generated-types';

export default function OrganizationSelectorTable({
  organizations
}: {
  organizations: OrganizationDto[];
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
        entities={organizations}
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

export const OrganizationColumnsInitial: StringPathsNoDeepOptionals<OrganizationDto>[] =
  ['name', 'type.name'];

export const OrganizationColumns: Column<OrganizationDto>[] = [
  { name: 'Name', uid: 'name', sortable: true },
  { name: 'Type', uid: 'type.name', sortable: true }
];

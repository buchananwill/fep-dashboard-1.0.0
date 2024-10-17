'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { UserRoleDto } from '@/api/generated-types/generated-types';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { StringValueChip } from '@/components/tables/StringValueChip';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { Column, ColumnUid } from '@/types';
import { RenameAndDeleteCell } from '@/components/work-project-series-schema/_components/RenameAndDeleteCell';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import { useNavigationCallback } from '@/components/tables/edit-tables/WorkTaskTypeEditTable';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { DeleteEntity } from '@/components/tables/cells/DeleteEntity';
import EditTextPropertyCell from '@/components/tables/cells/EditTextPropertyCell';

const entityType = EntityClassMap.userRole;

export default function UserRoleEditTable({
  pathVariables
}: LeafComponentProps) {
  const entities = useFilterOutDeletedEntities<UserRoleDto>(entityType);
  const navigationCallback = useNavigationCallback(
    '/' + ['core', ...pathVariables, 'create'].join('/')
  );

  return (
    <FilterSelectEntityTable
      entityClass={entityType}
      entities={entities}
      columns={columns}
      selectionMode={'none'}
      initialColumns={initialColumns}
      filterProperty={'name'}
      renderCell={userRoleRenderCellFunction}
      isCompact={true}
      classNames={{
        wrapper: 'w-[90vw] h-[70vh]',
        td: 'py-0.5'
      }}
      addRow={navigationCallback}
    />
  );
}

const columns: Column<UserRoleDto>[] = [
  { uid: 'id', name: 'Delete', sortable: true },
  { uid: 'name', name: 'Name', sortable: true },
  {
    uid: 'knowledgeLevelSeriesName',
    name: getStartCaseDomainAlias('knowledgeLevelSeries'),
    sortable: true
  },
  { uid: 'partyName', name: 'Party Name', sortable: true }
];

const initialColumns: ColumnUid<UserRoleDto>[] = [
  'name',
  'knowledgeLevelSeriesName',
  'partyName'
];

export const userRoleRenderCellFunction = getCellRenderFunction('userRole', {
  id: DeleteEntity,
  name: EditTextPropertyCell,
  knowledgeLevelSeriesName: StringValueChip,
  partyName: StringValueChip
});

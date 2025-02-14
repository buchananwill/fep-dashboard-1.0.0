'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { UserRoleDto } from '@/api/generated-types/generated-types_';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { Column, ColumnUid } from '@/types';
import { useNavigationCallback } from '@/components/tables/edit-tables/WorkTypeEditTable';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { DeleteEntity } from '@/components/tables/cells-v2/generic/DeleteEntity';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import EditNameCell from '@/components/tables/cells-v2/generic/EditNameCell';
import { AnyValueToString } from '../cells-v2/generic/AnyValueToString';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

const entityType = EntityClassMap.userRole;

export default function UserRoleEditTable({
  pathVariables
}: LeafComponentProps) {
  const navigationCallback = useNavigationCallback(
    '/' + ['core', ...pathVariables, 'create'].join('/')
  );

  return (
    <div className={'flex h-[75vh] flex-col gap-2 p-2'}>
      <EntityTable
        entityClass={entityType}
        columns={columns}
        cellModel={userRoleRenderCellFunction}
        defaultSort={Sorts.name}
        // addRow={navigationCallback}
      />
    </div>
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

const UserCellRecord: CellComponentRecord<UserRoleDto, number> = {
  id: { component: DeleteEntity, type: 'CustomCell' },
  name: { component: EditNameCell, type: 'IdInnerCell' },
  knowledgeLevelSeriesName: {
    component: AnyValueToString,
    type: 'IdInnerCell'
  },
  partyName: { component: AnyValueToString, type: 'IdInnerCell' }
};

export const userRoleRenderCellFunction = getCellRenderFunction(
  'userRole',
  UserCellRecord
);

'use client';
import { ProviderRoleDto } from '@/api/generated-types/generated-types';
import { useNavigationCallback } from '@/components/tables/edit-tables/WorkTaskTypeEditTable';
import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import {
  providerColumns,
  ProviderColumnsInitial
} from '@/components/tables/selectorTables/ProviderRoleSelectorTable';
import { Column, ColumnUid } from '@/types';
import { getTypeUpdateCell } from '@/components/tables/cells-v2/TypeUpdateCell';
import { KnowledgeDomainSelectCell } from '@/components/tables/cells-v2/SelectKnowledgeDomainCell';
import EntityEditTable from '@/components/tables/edit-v2/EntityEditTable';
import { getCellRenderFunction } from '@/components/tables/cells-v2/GetCellRenderFunction';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import EditNameCell from '@/components/tables/cells-v2/EditNameCell';
import { getStringUpdater } from '@/components/tables/edit-v2/cellUpdaterFunctions';
import { AnyValueToString } from '@/components/tables/cells-v2/AnyValueToString';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

const entityType = EntityClassMap.providerRole;

export default function ProviderRoleEditTable({
  pathVariables
}: LeafComponentProps) {
  const navigationCallback = useNavigationCallback(
    '/' + ['core', pathVariables[0], 'create-new-role'].join('/')
  );

  return (
    <div className={'flex h-[75vh] flex-col gap-2 p-2'}>
      <EntityEditTable
        entityClass={entityType}
        columns={providerEditColumns}
        cellModel={cellRenderFunction}
        defaultSort={Sorts.name}
        // addRow={navigationCallback}
      />
    </div>
  );
}

const providerEditColumns: Column<ProviderRoleDto>[] = [
  ...providerColumns,
  { uid: 'name', name: 'Name', sortable: true }
] as const;

const initialEditColumns: ColumnUid<ProviderRoleDto>[] = [
  ...ProviderColumnsInitial,
  'type.name'
] as const;

const CellMap: CellComponentRecord<ProviderRoleDto, number> = {
  name: {
    component: EditNameCell,
    type: 'IdInnerCell',
    updater: getStringUpdater('name')
  },
  partyName: { component: AnyValueToString, type: 'IdInnerCell' },
  knowledgeDomainName: {
    component: KnowledgeDomainSelectCell,
    type: 'IdInnerCell'
  },
  'type.name': {
    component: getTypeUpdateCell('ProviderRoleType'),
    type: 'IdInnerCell'
  }
} as const;

const cellRenderFunction = getCellRenderFunction('providerRole', CellMap);

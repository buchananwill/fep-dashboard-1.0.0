'use client';
import { ResourceRequirementItemDto } from '@/api/generated-types/generated-types_';
import React, { useCallback } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { Column, ColumnUid } from '@/types';
import { ResourceRequirementItemCells } from '@/components/tables/cells-v2/specific/ResourceRequirementItemCells';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';
import { useMasterListToCreate } from '@/hooks/useMasterListToCreate';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { Sorts } from '@/components/tables/cells-v2/DefaultSortStates';

export default function ResourceRequirementItemEditTable({
  workTypeId
}: {
  workTypeId: number;
}) {
  const createCallback = useCallback(() => {
    return createResourceRequirementItem(workTypeId);
  }, [workTypeId]);

  const create = useMasterListToCreate(
    createCallback,
    EntityClassMap.resourceRequirementItem
  );

  return (
    <EntityTable
      entityClass={EntityClassMap.resourceRequirementItem}
      columns={COLUMNS}
      cellModel={ResourceRequirementItemCells}
      defaultSort={Sorts.none}
      hideFiltering
      // addRow={create}
    />
  );
}

const COLUMNS: Column<ResourceRequirementItemDto>[] = [
  { name: 'Delete', uid: 'id', sortable: false },
  {
    name: getStartCaseDomainAlias('ProviderRoleType'),
    uid: 'providerRoleType'
  },
  { name: getStartCaseDomainAlias('AssetRoleType'), uid: 'assetRoleType' },
  { name: 'WorkType', uid: 'workTypeId' }
];

const INITIAL_COLUMNS: ColumnUid<ResourceRequirementItemDto>[] = [
  'id',
  'assetRoleType',
  'providerRoleType',
  'workTypeId'
];

function createResourceRequirementItem(
  workTypeId: number
): ResourceRequirementItemDto {
  return {
    workTypeId: workTypeId,
    id: idDecrementer()
  };
}

'use client';
import { ResourceRequirementItemDto } from '@/api/generated-types/generated-types';
import React, { useCallback } from 'react';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { Column, ColumnUid } from '@/types';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import { ResourceRequirementItemCells } from '@/components/tables/cells/ResourceRequirementItemCells';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';
import { useMasterListToCreate } from '@/hooks/useMasterListToCreate';

export default function ResourceRequirementItemEditTable({
  workTaskTypeId
}: {
  workTaskTypeId: number;
}) {
  const entities = useFilterOutDeletedEntities<ResourceRequirementItemDto>(
    EntityClassMap.resourceRequirementItem
  );

  const createCallback = useCallback(() => {
    return createResourceRequirementItem(workTaskTypeId);
  }, [workTaskTypeId]);

  const create = useMasterListToCreate(
    createCallback,
    EntityClassMap.resourceRequirementItem
  );

  return (
    <FilterSelectEntityTable
      isCompact={true}
      classNames={{
        wrapper: 'w-[60vw]'
      }}
      entityClass={EntityClassMap.resourceRequirementItem}
      entities={entities}
      columns={COLUMNS}
      selectionMode={'none'}
      initialColumns={INITIAL_COLUMNS}
      filterProperty={'id'}
      renderCell={ResourceRequirementItemCells}
      addRow={create}
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
  { name: 'WorkTaskType', uid: 'workTaskTypeId' }
];

const INITIAL_COLUMNS: ColumnUid<ResourceRequirementItemDto>[] = [
  'id',
  'assetRoleType',
  'providerRoleType',
  'workTaskTypeId'
];

function createResourceRequirementItem(
  workTaskTypeId: number
): ResourceRequirementItemDto {
  return {
    workTaskTypeId: workTaskTypeId,
    id: idDecrementer()
  };
}

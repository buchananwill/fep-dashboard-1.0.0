'use client';

import React from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { Card, CardBody } from '@nextui-org/card';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { AdjustAllocationInWrapper } from '@/components/work-project-series-schema/_components/AdjustAllocation';
import { StringValueChip } from '@/components/tables/StringValueChip';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import { Column, ColumnUid } from '@/types';
import { NestedDtoStoreNumberEditCell } from '@/components/tables/NestedDtoStoreNumberEditCell';
import { RenameAndDeleteCell } from '@/components/work-project-series-schema/_components/RenameAndDeleteCell';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import RootCard from '@/components/generic/RootCard';

import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

const entityType = EntityClassMap.workProjectSeriesSchema;

export default function WorkProjectSeriesSchemaEditTable({
  pathVariables
}: LeafComponentProps) {
  const entities =
    useFilterOutDeletedEntities<WorkProjectSeriesSchemaDto>(entityType);

  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <FilterSelectEntityTable
        entityClass={entityType}
        entities={entities}
        columns={columns}
        selectionMode={'none'}
        initialColumns={initialColumns}
        filterProperty={'name'}
        renderCell={workProjectSeriesSchemaRenderCellFunction}
        isCompact={true}
        classNames={{
          wrapper: 'w-[90vw] h-[70vh]',
          td: 'py-0.5'
        }}
      />
    </RootCard>
  );
}

const columns: Column<WorkProjectSeriesSchemaDto>[] = [
  { uid: 'name', name: 'Name', sortable: true },
  {
    uid: 'deliveryAllocations',
    name: startCase(getDomainAlias('deliveryAllocations')),
    sortable: false,
    ignoreFilter: true
  },
  {
    uid: 'workTaskType.knowledgeDomain.shortCode',
    name: 'Short Code',
    sortable: true
  },
  {
    uid: 'userToProviderRatio',
    sortable: true,
    name: `${startCase(getDomainAlias('user'))} limit`
  },
  { uid: 'workTaskType.name', name: startCase('workTaskType'), sortable: true }
];

const initialColumns: ColumnUid<WorkProjectSeriesSchemaDto>[] = [
  'name',
  'deliveryAllocations',
  'workTaskType.knowledgeDomain.shortCode',
  'userToProviderRatio'
];

export const workProjectSeriesSchemaRenderCellFunction = getCellRenderFunction(
  'workProjectSeriesSchema',
  {
    name: RenameAndDeleteCell,
    userToProviderRatio: NestedDtoStoreNumberEditCell,
    deliveryAllocations: AdjustAllocationInWrapper,
    'workTaskType.knowledgeDomain.shortCode': StringValueChip,
    'workTaskType.name': StringValueChip
  }
);

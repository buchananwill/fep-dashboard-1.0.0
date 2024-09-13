'use client';

import React, { useMemo } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { Card, CardBody } from '@nextui-org/card';

import { sumAllSchemas } from '@/app/work-project-series-schemas/_functions/sumDeliveryAllocations';
import { useGlobalListener, useGlobalListenerGroup } from 'selective-context';
import { EmptyArray } from '@/api/literals';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { getCellRenderFunction } from '@/app/work-project-series-schemas/_components/GetCellRenderFunction';
import { AdjustAllocationInWrapper } from '@/app/work-project-series-schemas/_components/AdjustAllocation';
import { StringValueChip } from '@/app/work-project-series-schemas/_components/StringValueChip';
import FilterSelectEntityTable from '@/components/generic/FilterSelectEntityTable';
import { Column, ColumnUid } from '@/types';
import { NestedDtoStoreNumberEditCell } from '@/app/work-project-series-schemas/_components/NestedDtoStoreNumberEditCell';
import { RenameWpss } from '@/app/work-project-series-schemas/_components/RenameWpss';

const entityType = EntityClassMap.workProjectSeriesSchema;
const initialMap = new Map();

export default function WorkProjectSeriesSchemaEditTable() {
  const { currentState: idList } = useGlobalListener({
    contextKey: `${EntityClassMap.workProjectSeriesSchema}:idList`,
    initialValue: EmptyArray,
    listenerKey: 'editList'
  });

  const contextKeys = useMemo(() => {
    return idList.map(
      (id) => `${EntityClassMap.workProjectSeriesSchema}:${id}`
    );
  }, [idList]);

  const { currentState } = useGlobalListenerGroup<WorkProjectSeriesSchemaDto>({
    contextKeys,
    listenerKey: 'editList',
    initialValue: initialMap
  });

  const totalAllocation = useMemo(() => {
    return sumAllSchemas([...currentState.values()]);
  }, [currentState]);

  return (
    <Card className={'center-all-margin relative'}>
      <CardBody>
        <FilterSelectEntityTable
          entityClass={EntityClassMap.workProjectSeriesSchema}
          entities={[...currentState.values()]}
          columns={columns}
          selectionMode={'none'}
          initialColumns={initialColumns}
          filterProperty={'name'}
          renderCell={wpssRenderCellFunction}
          isCompact={true}
          classNames={{
            wrapper: 'w-[90vw] h-[70vh]',
            td: 'py-0.5'
          }}
        />
      </CardBody>
    </Card>
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
  }
];

const initialColumns: ColumnUid<WorkProjectSeriesSchemaDto>[] = [
  'name',
  'deliveryAllocations',
  'workTaskType.knowledgeDomain.shortCode',
  'userToProviderRatio'
];

const wpssRenderCellFunction =
  getCellRenderFunction<WorkProjectSeriesSchemaDto>(
    {
      name: RenameWpss,
      userToProviderRatio: NestedDtoStoreNumberEditCell,
      deliveryAllocations: AdjustAllocationInWrapper,
      'workTaskType.knowledgeDomain.shortCode': StringValueChip
    },
    EntityClassMap.workProjectSeriesSchema
  );

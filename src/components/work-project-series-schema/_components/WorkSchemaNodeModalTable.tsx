'use client';

import { EntityClassMap } from '@/api/entity-class-map';
import React, { useCallback, useMemo } from 'react';
import { DispatchState } from '@/types';
import { WorkSchemaNodeDto } from '@/api/generated-types/generated-types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import {
  WorkProjectSeriesSchemaColumns,
  WpssCellModelReadOnly
} from '@/components/tables/selectorTables/WorkProjectSeriesSchemaSelectorTable';
import { useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders } from '@/components/work-project-series-schema/_components/useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders';
import { Card } from '@mantine/core';
import { getDomainAlias } from '@/api/getDomainAlias';

export type SyncDirection = 'propToStore' | 'storeToState';

export default function WorkSchemaNodeModalTable({
  workSchemaNode,
  dispatchWithoutControl
}: {
  workSchemaNode: WorkSchemaNodeDto;
  dispatchWithoutControl?: DispatchState<WorkSchemaNodeDto>;
}) {
  const { workProjectSeriesSchemaId } = workSchemaNode;
  const wpssIdSelection = useMemo(() => {
    return workProjectSeriesSchemaId ? [workProjectSeriesSchemaId] : [];
  }, [workProjectSeriesSchemaId]);

  const updateEntityFromStateSelectionList = useCallback(
    (list: number[]) => {
      const nextWpssId = list.length > 0 ? list[0] : undefined;
      if (!dispatchWithoutControl) return;
      dispatchWithoutControl((wsn) => ({
        ...wsn,
        workProjectSeriesSchemaId: nextWpssId
      }));
    },
    [dispatchWithoutControl]
  );
  useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders(
    wpssIdSelection,
    updateEntityFromStateSelectionList,
    EntityClassMap.workProjectSeriesSchema
  );

  return (
    <Card className={'flex flex-col gap-1 p-1'}>
      <Card.Section className={'flex justify-center text-center font-bold'}>
        Select {getDomainAlias('workProjectSeriesSchema')} for node:
      </Card.Section>
      <EntityTable
        key={`select-table-${workSchemaNode.id}`}
        cellModel={WpssCellModelReadOnly}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        columns={WorkProjectSeriesSchemaColumns}
        withSelection={'single'}
      />
    </Card>
  );
}

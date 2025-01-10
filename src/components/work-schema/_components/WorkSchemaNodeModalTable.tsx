'use client';

import { EntityClassMap } from '@/api/entity-class-map';
import React, { useCallback, useMemo } from 'react';
import { DispatchState } from '@/types';
import { WorkSchemaNodeDto } from '@/api/generated-types/generated-types_';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import {
  WorkSchemaColumns,
  WpssCellModelReadOnly
} from '@/components/tables/selectorTables/WorkSchemaSelectorTable';
import { useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders } from '@/components/work-schema/_components/useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders';
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
  const { workSchemaId } = workSchemaNode;
  const wpssIdSelection = useMemo(() => {
    return workSchemaId ? [workSchemaId] : [];
  }, [workSchemaId]);

  const updateEntityFromStateSelectionList = useCallback(
    (list: number[]) => {
      const nextWpssId = list.length > 0 ? list[0] : undefined;
      if (!dispatchWithoutControl) return;
      dispatchWithoutControl((wsn) => ({
        ...wsn,
        workSchemaId: nextWpssId
      }));
    },
    [dispatchWithoutControl]
  );
  useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders(
    wpssIdSelection,
    updateEntityFromStateSelectionList,
    EntityClassMap.workSchema
  );

  return (
    <Card className={'flex flex-col gap-1 p-1'}>
      <Card.Section className={'flex justify-center text-center font-bold'}>
        Select {getDomainAlias('workSchema')} for node:
      </Card.Section>
      <EntityTable
        key={`select-table-${workSchemaNode.id}`}
        cellModel={WpssCellModelReadOnly}
        entityClass={EntityClassMap.workSchema}
        columns={WorkSchemaColumns}
        withSelection={'single'}
      />
    </Card>
  );
}

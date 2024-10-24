'use client';

import { EntityClassMap } from '@/api/entity-class-map';
import React, { useEffect, useMemo, useState } from 'react';
import { DispatchState } from '@/types';
import { WorkSchemaNodeDto } from '@/api/generated-types/generated-types';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import {
  WorkProjectSeriesSchemaColumns,
  WpssCellModelReadOnly
} from '@/components/tables/selectorTables/WorkProjectSeriesSchemaSelectorTable';
import { NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';

type SyncDirection = 'propToStore' | 'storeToState';

export default function WorkSchemaNodeModalTable({
  workSchemaNode,
  dispatchWithoutControl
}: {
  workSchemaNode: WorkSchemaNodeDto;
  dispatchWithoutControl?: DispatchState<WorkSchemaNodeDto>;
}) {
  const listenerKey = useUuidListenerKey();
  const { workProjectSeriesSchemaId } = workSchemaNode;
  const wpssIdSelection = useMemo(() => {
    return workProjectSeriesSchemaId ? [workProjectSeriesSchemaId] : [];
  }, [workProjectSeriesSchemaId]);

  const [syncDirection, setSyncDirection] =
    useState<SyncDirection>('propToStore');

  const { dispatchWithoutControl: updateWpssSelection, currentState } =
    NamespacedHooks.useDispatchAndListen(
      EntityClassMap.workProjectSeriesSchema,
      KEY_TYPES.SELECTED,
      listenerKey,
      EmptyArray as number[]
    );

  useEffect(() => {
    if (!dispatchWithoutControl) return;
    if (syncDirection === 'propToStore') {
      updateWpssSelection(wpssIdSelection);
      setSyncDirection('storeToState');
    } else {
      const nextWpssId = currentState.length > 0 ? currentState[0] : undefined;

      dispatchWithoutControl((wsn) => ({
        ...wsn,
        workProjectSeriesSchemaId: nextWpssId
      }));
    }
  }, [
    wpssIdSelection,
    workProjectSeriesSchemaId,
    dispatchWithoutControl,
    syncDirection,
    currentState,
    updateWpssSelection
  ]);

  return (
    <div className={'flex flex-col gap-1 p-1'}>
      <EntityTable
        cellModel={WpssCellModelReadOnly}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        columns={WorkProjectSeriesSchemaColumns}
        withSelection={'single'}
      />
    </div>
  );
}

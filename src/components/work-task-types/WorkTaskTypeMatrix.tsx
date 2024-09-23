'use client';
import VirtualizedTableWindowed from '@/components/grids/VirtualizedTableWindowed';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray, ObjectPlaceholder } from '@/api/literals';
import {
  CellIndex,
  useRowIdColumnIdCells
} from '@/components/grids/createRowIdColumnIdCells';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { KnowledgeDomainRowHeader } from '@/components/work-task-types/KnowledgeDomainRowHeader';
import { KnowledgeLevelColumnHeader } from '@/components/work-task-types/KnowledgeLevelColumnHeader';
import { WorkTaskTypeMatrixCell } from '@/components/work-task-types/WorkTaskTypeMatrixCell';
import { useGlobalController } from 'selective-context';
import { DropResult } from '@/components/work-task-types/GenericSuitabilityCell';

const listenerKey = 'work-task-type-matrix';
export const hoverTargetCellIndex = 'hover-target-cellIndex';
export const dropResultContextKey = 'drop-result';
export default function WorkTaskTypeMatrix() {
  const { currentState: rowIdList } = NamespacedHooks.useListen<number[]>(
    EntityClassMap.knowledgeDomain,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray
  );
  const { currentState: columnIdList } = NamespacedHooks.useListen<number[]>(
    EntityClassMap.knowledgeLevel,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray
  );
  useGlobalController({
    contextKey: hoverTargetCellIndex,
    initialValue: ObjectPlaceholder as CellIndex,
    listenerKey
  });
  useGlobalController({
    contextKey: dropResultContextKey,
    initialValue: ObjectPlaceholder as DropResult,
    listenerKey
  });

  const cells = useRowIdColumnIdCells(rowIdList, columnIdList);

  return (
    <>
      <VirtualizedTableWindowed
        rowIdList={rowIdList}
        columnIdList={columnIdList}
        itemData={cells}
        renderCell={WorkTaskTypeMatrixCell}
        renderSyncedRowCell={KnowledgeLevelColumnHeader}
        renderSyncedColumnCell={KnowledgeDomainRowHeader}
        syncColumnWidth={200}
      />
    </>
  );
}

export type CellWrapperPropsWithId<T extends Identifier = Identifier> =
  CellWrapperProps & { entityId: T };

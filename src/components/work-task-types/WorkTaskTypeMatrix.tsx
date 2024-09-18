'use client';
import VirtualizedTableWindowed from '@/components/grids/VirtualizedTableWindowed';
import { Identifier, NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useRowIdColumnIdCells } from '@/components/grids/createRowIdColumnIdCells';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { useDtoStoreDispatchAndListener } from 'dto-stores/dist/hooks/main/store/useDtoStoreDispatchAndListener';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';
import { useCellIdReferences } from '@/components/work-task-types/useCellIdReferences';
import FallbackCell from '@/components/grids/FallbackCell';

export default function WorkTaskTypeMatrix() {
  const { currentState: rowIdList } = NamespacedHooks.useListen<number[]>(
    EntityClassMap.knowledgeDomain,
    KEY_TYPES.SELECTED,
    'work-task-type-matrix',
    EmptyArray
  );
  const { currentState: columnIdList } = NamespacedHooks.useListen<number[]>(
    EntityClassMap.knowledgeLevel,
    KEY_TYPES.SELECTED,
    'work-task-type-matrix',
    EmptyArray
  );

  const cells = useRowIdColumnIdCells(rowIdList, columnIdList);

  console.log(cells);

  return (
    <VirtualizedTableWindowed
      rowIdList={rowIdList}
      columnIdList={columnIdList}
      itemData={cells}
      renderCell={WorkTaskTypeMatrixCell}
      renderSyncedRowCell={KnowledgeLevelColumnHeader}
      renderSyncedColumnCell={KnowledgeDomainRowHeader}
    />
  );
}

function WorkTaskTypeMatrixCell(props: CellWrapperProps) {
  const cellIdReference = useCellIdReferences(props);

  return JSON.stringify(cellIdReference);
}

type CellWrapperPropsWithId<T extends Identifier = Identifier> =
  CellWrapperProps & { entityId: T };

function KnowledgeDomainRowHeader(props: CellWrapperProps<number>) {
  const idReferences = useCellIdReferences<number, Identifier>(props);

  if (!idReferences || !idReferences.rowId) return <FallbackCell {...props} />;
  const rowId = idReferences.rowId as number;
  return <KnowledgeDomainCell {...props} entityId={rowId} />;
}

function KnowledgeLevelColumnHeader(
  props: CellWrapperProps<Identifier, number>
) {
  const { columnId } = useCellIdReferences(props);

  return <KnowledgeLevelCell {...props} entityId={columnId} />;
}

function KnowledgeLevelCell({
  entityId,
  style
}: CellWrapperPropsWithId<number>) {
  const { currentState } = useDtoStoreDispatchAndListener<KnowledgeLevelDto>(
    entityId,
    EntityClassMap.knowledgeLevel
  );

  return <div style={style}>{currentState.levelOrdinal}</div>;
}

function KnowledgeDomainCell({
  entityId,
  style
}: CellWrapperProps & { entityId: number }) {
  const { currentState } = useDtoStoreDispatchAndListener<KnowledgeDomainDto>(
    entityId,
    EntityClassMap.knowledgeDomain
  );

  return <div style={style}>{currentState.name}</div>;
}

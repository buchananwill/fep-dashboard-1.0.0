import VirtualizedTableWindowed from '@/components/grids/VirtualizedTableWindowed';
import { Identifier, NamespacedHooks, useDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useRowIdColumnIdCells } from '@/components/grids/createRowIdColumnIdCells';
import {
  CellWrapperProps,
  getCellIdReference
} from '@/components/grids/getCellIdReference';
import { useMemo } from 'react';
import { useDtoStoreDispatchAndListener } from 'dto-stores/dist/hooks/main/store/useDtoStoreDispatchAndListener';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';

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
  const { rowId } = useCellIdReferences<number, Identifier>(props);

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

function useCellIdReferences<T extends Identifier, U extends Identifier>(
  props: CellWrapperProps<T, U>
) {
  const { data, columnIndex, rowIndex } = props;
  return useMemo(() => {
    return getCellIdReference<T, U>({ data, columnIndex, rowIndex });
  }, [data, columnIndex, rowIndex]);
}

import { useMemo } from 'react';
import { flattenDeep } from 'lodash';
import { EditAddDeleteDtoControllerArray, Identifier } from 'dto-stores';
import { useRowIdColumnIdCells } from '@/components/grids/createRowIdColumnIdCells';

export const CellEntityClass = 'Cell';
export default function SuitabilityCellManager({
  rowIdList,
  columnIdList
}: {
  rowIdList: Identifier[];
  columnIdList: Identifier[];
}) {
  const cells = useRowIdColumnIdCells(rowIdList, columnIdList);

  const joinedIdCells = useMemo(() => {
    return flattenDeep(cells).map(({ columnId, rowId }) => ({
      value: 0,
      isDynamic: true,
      id: `${rowId}:${columnId}`,
      knowledgeDomainId: rowId,
      knowledgeLevelId: columnId
    }));
  }, [cells]);

  return (
    <EditAddDeleteDtoControllerArray
      entityClass={CellEntityClass}
      dtoList={joinedIdCells}
    />
  );
}

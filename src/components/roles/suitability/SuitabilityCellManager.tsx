import { useMemo } from 'react';
import { flattenDeep } from 'lodash';
import { EditAddDeleteDtoControllerArray, Identifier } from 'dto-stores';
import { useRowIdColumnIdCells } from '@/components/grids/createRowIdColumnIdCells';
import {
  CreateRoleCell,
  SuitabilityMatrixCell
} from '@/components/work-types/suitabilityMatrixCell';

export const CellEntityClass = 'Cell';
export default function SuitabilityCellManager({
  rowIdList,
  columnIdList
}: {
  rowIdList: Identifier[];
  columnIdList: Identifier[];
}) {
  const cells = useRowIdColumnIdCells(rowIdList, columnIdList);

  const joinedIdCells: CreateRoleCell[] = useMemo(() => {
    return flattenDeep(cells).map(({ columnId, rowId }) => ({
      rating: 0,
      isDynamic: false,
      id: `${rowId}:${columnId}`,
      knowledgeDomainId: rowId as number,
      knowledgeLevelId: columnId as number
    }));
  }, [cells]);

  return (
    <EditAddDeleteDtoControllerArray
      entityClass={CellEntityClass}
      dtoList={joinedIdCells}
    />
  );
}

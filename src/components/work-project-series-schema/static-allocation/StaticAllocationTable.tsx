'use client';
import { StaticAllocationTableDto } from '@/components/work-project-series-schema/static-allocation/StaticAllocationPage';
import VirtualizedTableWindowed from '@/components/grids/VirtualizedTableWindowed';
import CellQueryManager from '@/components/grids/CellQueryManager';
import {
  getCellDataIdReferenceOrUndefined,
  getCellDataOrUndefined
} from '@/components/work-project-series-schema/static-allocation/getCellDataOrUndefined';
import CycleSubspanCellWithJoins from '@/components/grids/CycleSubspanCellWithJoins';
import { NamespacedHooks, useEffectSyncWithDispatch } from 'dto-stores';
import { MemoWorkProjectSeriesSchemaCell } from '@/components/work-project-series-schema/WorkProjectSeriesSchemaCell';
import StaticAllocationCell from '@/components/work-project-series-schema/static-allocation/StaticAllocationCell';
import { memo, useMemo } from 'react';
import { useGlobalController } from 'selective-context';
import FinderTableButton from '@/components/tables/FinderTableButton';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useTableProps } from '@/components/grids/useTableProps';
import { CellEntityClass } from '@/components/roles/suitability/SuitabilityCellManager';
import { createCell } from '@/components/work-project-series-schema/static-allocation/createCell';

export const cycleSubspanGroupMap = 'CycleSubspanGroupMap';

export default function StaticAllocationTable({
  tableData
}: {
  tableData: StaticAllocationTableDto;
}) {
  const { rowList, columnList } = tableData;
  // const tableProps = useFilteredRows(
  //   tableData,
  //   EntityClassMap.workProjectSeriesSchema
  // );
  //
  //

  const tableProps = useTableProps(rowList, columnList);

  const cycleSubspanGroupIdToCycleSubspanIdList = useMemo(
    () =>
      columnList.reduce(
        (prev, curr) => {
          const { cycleSubspanJoins, joinsIfNotFirst } = curr;
          // Loop to collect the cycleSubspans that are the first of a group.
          Object.values(cycleSubspanJoins).forEach((join) => {
            let list = prev[join.cycleSubspanGroupId];
            if (list === undefined) {
              list = [];
              prev[join.cycleSubspanGroupId] = list;
            }
            list.push(curr.id);
          });
          // Nested loop to collect the cycleSubspans that are "nth != first" of a group.
          Object.values(joinsIfNotFirst).forEach((joinList) => {
            joinList.forEach((join) => {
              let list = prev[join.cycleSubspanGroupId];
              if (list === undefined) {
                list = [];
                prev[join.cycleSubspanGroupId] = list;
              }
              list.push(curr.id);
            });
          });
          return prev;
        },
        {} as Record<string, number[]>
      ),
    [columnList]
  );

  useGlobalController({
    contextKey: cycleSubspanGroupMap,
    initialValue: cycleSubspanGroupIdToCycleSubspanIdList,
    listenerKey: 'StaticAllocationTableController'
  });

  const dispatchCells = NamespacedHooks.useDispatch(
    CellEntityClass,
    KEY_TYPES.MASTER_LIST
  );

  // Can this somehow be made to always be able to recall the relevant cell ID reference, even for transient cell data?
  const flattened = useMemo(() => {
    const cellDataOrUndefined = getCellDataIdReferenceOrUndefined(tableData);
    return tableProps.itemData
      .flatMap((list) => [...list])
      .map(({ rowId, columnId }) =>
        createCell(
          CellEntityClass,
          String(rowId),
          String(columnId),
          cellDataOrUndefined.memoizedFunction({ rowId, columnId })
        )
      );
  }, [tableProps.itemData, tableData]);

  useEffectSyncWithDispatch(flattened, dispatchCells);

  return (
    <div className={'h-[90vh] w-[90vw] p-8 pt-12'}>
      <FinderTableButton workProjectSeriesSchema={rowList} />

      <CellQueryManager
        tableData={tableData}
        getDataRetrievalMemoizedFunction={getCellDataOrUndefined}
      />
      <VirtualizedTableWindowed
        {...tableProps}
        renderCell={MemoStaticAllocationCell}
        renderSyncedRowCell={MemoCycleSubspanCell}
        renderSyncedColumnCell={MemoWorkProjectSeriesSchemaCell}
      />
    </div>
  );
}

export const MemoCycleSubspanCell = memo(CycleSubspanCellWithJoins);

const MemoStaticAllocationCell = memo(StaticAllocationCell);

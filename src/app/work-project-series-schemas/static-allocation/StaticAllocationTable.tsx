'use client';
import { StaticAllocationTableDto } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationPage';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import CellQueryManager from '@/components/tables/CellQueryManager';
import { useTableProps } from '@/app/service-categories/[id]/roles/_components/useTableProps';
import {
  getCellDataIdOrUndefined,
  getCellDataOrUndefined
} from '@/app/work-project-series-schemas/static-allocation/getCellDataOrUndefined';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/_components/CycleSubspanCell';
import { EditAddDeleteDtoControllerArray, Identifier } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { MemoWorkProjectSeriesSchemaCell } from '@/app/work-project-series-schemas/WorkProjectSeriesSchemaCell';
import StaticAllocationCell from '@/app/work-project-series-schemas/static-allocation/StaticAllocationCell';
import { memo, useMemo } from 'react';
import { useGlobalController } from 'selective-context';
import FinderTableButton from '@/components/tables/FinderTableButton';

export const cycleSubspanGroupMap = 'CycleSubspanGroupMap';
export default function StaticAllocationTable({
  tableData
}: {
  tableData: StaticAllocationTableDto;
}) {
  const tableProps = useTableProps(tableData.rowList, tableData.columnList);

  // We want two things: some data held in a table, and a function that from this data can create another function that when given a CellIdReference returns either the cell data or undefined.
  const { rowColumnCellReferenceMap, columnList } = tableData;
  const cycleSubspanGroupIdToCycleSubspanIdList = useMemo(
    () =>
      columnList.reduce(
        (prev, curr) => {
          const { cycleSubspanJoins } = curr;
          Object.values(cycleSubspanJoins).forEach((join) => {
            let list = prev[join.cycleSubspanGroupId];
            if (list === undefined) {
              list = [];
              prev[join.cycleSubspanGroupId] = list;
            }
            list.push(curr.id);
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

  const flattened = useMemo(() => {
    const cellDataOrUndefined = getCellDataIdOrUndefined(tableData);

    return tableProps.itemData
      .flatMap((list) => [...list])
      .map(({ rowId, columnId }) =>
        createCell(
          EntityClassMap.staticDeliveryAllocationItem,
          String(rowId),
          String(columnId),
          cellDataOrUndefined.memoizedFunction({ rowId, columnId })
        )
      );
  }, [tableProps.itemData, tableData]);

  return (
    <div className={'h-[90vh] w-[90vw] p-8 pt-12'}>
      <FinderTableButton workProjectSeriesSchemas={tableData.rowList} />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={tableData.columnList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProjectSeriesSchema}
        dtoList={tableData.rowList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={'Cell'}
        dtoList={flattened}
      />
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

const MemoCycleSubspanCell = memo(CycleSubspanCell);

const MemoStaticAllocationCell = memo(StaticAllocationCell);

export interface Cell<T> {
  id: string;
  data: T;
}

export function getCellId(
  entityClass: string,
  rowId: Identifier,
  columnId: Identifier
) {
  return `${entityClass}:${rowId}:${columnId}`;
}

function createCell<T>(
  entityClass: string,
  rowId: Identifier,
  columnId: Identifier,
  data: T
) {
  return { id: getCellId(entityClass, rowId, columnId), data };
}

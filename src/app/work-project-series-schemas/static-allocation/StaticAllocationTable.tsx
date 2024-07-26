'use client';
import { StaticAllocationTableDto } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationPage';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import CellQueryManager from '@/components/tables/CellQueryManager';
import { getTableProps } from '@/app/service-categories/[id]/roles/_components/getTableProps';
import { FallbackCellMemo } from '@/components/tables/FallbackCell';
import { getCellDataOrUndefined } from '@/app/work-project-series-schemas/static-allocation/getCellDataOrUndefined';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/_components/CycleSubspanCell';
import { EditAddDeleteDtoControllerArray, Identifier } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { MemoWorkProjectSeriesSchemaCell } from '@/app/work-project-series-schemas/WorkProjectSeriesSchemaCell';
import StaticAllocationCell from '@/app/work-project-series-schemas/static-allocation/StaticAllocationCell';
import { useMemo } from 'react';

export default function StaticAllocationTable({
  tableData
}: {
  tableData: StaticAllocationTableDto;
}) {
  const tableProps = getTableProps(tableData.rowList, tableData.columnList);

  // We want two things: some data held in a table, and a function that from this data can create another function that when given a CellIdReference returns either the cell data or undefined.
  const { rowColumnCellReferenceMap } = tableData;

  const flattened = useMemo(() => {
    const cellDataOrUndefined = getCellDataOrUndefined(tableData);

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
    <div className={'h-[90vh] w-[90vw]'}>
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
        renderCell={StaticAllocationCell}
        renderSyncedRowCell={CycleSubspanCell}
        renderSyncedColumnCell={MemoWorkProjectSeriesSchemaCell}
      />
    </div>
  );
}

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

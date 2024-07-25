'use client';
import { StaticAllocationTableDto } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationPage';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import CellQueryManager from '@/components/tables/CellQueryManager';
import { getTableProps } from '@/app/service-categories/[id]/roles/_components/getTableProps';
import { FallbackCellMemo } from '@/components/tables/FallbackCell';
import { getCellDataOrUndefined } from '@/app/work-project-series-schemas/static-allocation/getCellDataOrUndefined';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/_components/CycleSubspanCell';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';

export default function StaticAllocationTable({
  tableData
}: {
  tableData: StaticAllocationTableDto;
}) {
  const tableProps = getTableProps(tableData.rowList, tableData.columnList);
  return (
    <div className={'h-[90vh] w-[90vw]'}>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={tableData.columnList}
      />
      <CellQueryManager
        tableData={tableData}
        getDataRetrievalMemoizedFunction={getCellDataOrUndefined}
      />
      <VirtualizedTableWindowed
        {...tableProps}
        renderCell={FallbackCellMemo}
        renderSyncedRowCell={CycleSubspanCell}
        renderSyncedColumnCell={FallbackCellMemo}
      />
    </div>
  );
}

'use client';
import { StaticAllocationTableDto } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationPage';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import CellQueryManager from '@/components/tables/CellQueryManager';
import {
  getCellDataIdReferenceOrUndefined,
  getCellDataOrUndefined
} from '@/app/work-project-series-schemas/static-allocation/getCellDataOrUndefined';
import CycleSubspanCell from '@/app/service-categories/[id]/roles/_components/CycleSubspanCell';
import {
  Identifier,
  NamespacedHooks,
  useEffectSyncWithDispatch
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { MemoWorkProjectSeriesSchemaCell } from '@/app/work-project-series-schemas/WorkProjectSeriesSchemaCell';
import StaticAllocationCell from '@/app/work-project-series-schemas/static-allocation/StaticAllocationCell';
import { memo, useMemo } from 'react';
import { useGlobalController } from 'selective-context';
import FinderTableButton from '@/components/tables/FinderTableButton';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useFilteredRows } from '@/app/work-project-series-schemas/static-allocation/useFilteredRows';

export const cycleSubspanGroupMap = 'CycleSubspanGroupMap';

export default function StaticAllocationTable({
  tableData
}: {
  tableData: StaticAllocationTableDto;
}) {
  const { rowList, columnList } = tableData;
  const tableProps = useFilteredRows(
    tableData,
    EntityClassMap.workProjectSeriesSchema
  );

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

  const dispatchCells = NamespacedHooks.useDispatch(
    'Cell',
    KEY_TYPES.MASTER_LIST
  );

  // Can this somehow be made to always be able to recall the relevant cell ID reference, even for transient cell data?
  const flattened = useMemo(() => {
    const cellDataOrUndefined = getCellDataIdReferenceOrUndefined(tableData);
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

  useEffectSyncWithDispatch(flattened, dispatchCells);

  return (
    <div className={'h-[90vh] w-[90vw] p-8 pt-12'}>
      <FinderTableButton workProjectSeriesSchemas={rowList} />

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

export const MemoCycleSubspanCell = memo(CycleSubspanCell);

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

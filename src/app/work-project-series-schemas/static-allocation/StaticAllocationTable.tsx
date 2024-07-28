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
import {
  EditAddDeleteDtoControllerArray,
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
import { EmptyArray } from '@/api/literals';

export const cycleSubspanGroupMap = 'CycleSubspanGroupMap';
export default function StaticAllocationTable({
  tableData
}: {
  tableData: StaticAllocationTableDto;
}) {
  console.log('table data:', tableData);
  const { rowList, columnList } = tableData;
  const { currentState } = NamespacedHooks.useListen(
    EntityClassMap.workProjectSeriesSchema,
    KEY_TYPES.SELECTED,
    'staticAllocationTable',
    EmptyArray as string[]
  );

  const tableDataFiltered = useMemo(() => {
    const selectedWpssIdList = new Set(currentState);
    return {
      ...tableData,
      rowList: rowList.filter((wpss) => selectedWpssIdList.has(wpss.id))
    };
  }, [currentState, tableData, rowList]);

  const tableProps = useTableProps(tableDataFiltered.rowList, columnList);

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
    const cellDataOrUndefined = getCellDataIdOrUndefined(tableData);
    console.log(cellDataOrUndefined);
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
  console.log('Cell list:', flattened);

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

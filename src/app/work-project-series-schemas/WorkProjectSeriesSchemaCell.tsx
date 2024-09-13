import {
  BaseDtoUiProps,
  DtoUiWrapper,
  InitialMap,
  NamespacedHooks,
  useWriteAnyDto
} from 'dto-stores';
import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema';
import {
  CellWrapperProps,
  getCellIdReference
} from '@/components/tables/getCellIdReference';
import { EntityClassMap } from '@/api/entity-class-map';
import { memo, useCallback, useMemo } from 'react';
import { StaticDeliveryAllocationItemDto } from '@/api/zod-schemas/StaticDeliveryAllocationItemDtoSchema';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import clsx from 'clsx';
import { useStaticAllocationCellUpdater } from '@/app/work-project-series-schemas/static-allocation/UseStaticAllocationCellUpdater';
import { useGlobalListener } from 'selective-context';
import { cycleSubspanGroupMap } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationTable';
import { ObjectPlaceholder } from '@/api/literals';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { StaticAllocationDraggable } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationDraggable';
import { DeliveryAllocationDto } from '@/api/generated-types/generated-types';
import {
  allocationCounter,
  getAllocationCounterId,
  AllocationCounter
} from '@/app/work-project-series-schemas/static-allocation/StaticAllocationAuditor';
import { getDeliveryAllocationSize } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationDropZone';

function InnerWorkProjectSeriesSchemaCell({
  entity
}: BaseDtoUiProps<WorkProjectSeriesSchemaDto>) {
  return (
    <span className={'center-vertical-with-margin inline-block truncate pl-1'}>
      {entity.name}
    </span>
  );
}

export default function WorkProjectSeriesSchemaCell(props: CellWrapperProps) {
  const { columnIndex, rowIndex, data, style } = props;
  const { rowId } = getCellIdReference({ data, columnIndex, rowIndex });
  const canDropCallback = useCallback(
    (
      item: StaticDeliveryAllocationItemDto,
      monitor: DropTargetMonitor<StaticDeliveryAllocationItemDto>
    ) => {
      return true;
    },
    []
  );

  const listenerKey = `workProjectSeriesSchemaCell:${rowId}`;
  const { currentState: cycleSubspanGroupMapCurrent } = useGlobalListener({
    contextKey: cycleSubspanGroupMap,
    listenerKey,
    initialValue: ObjectPlaceholder as Record<string, number[]>
  });

  const staticAllocationCellUpdater = useStaticAllocationCellUpdater(rowId);
  const writeAnyStaticAllocation =
    useWriteAnyDto<StaticDeliveryAllocationItemDto>(
      EntityClassMap.staticDeliveryAllocationItem
    );

  const dispatchDeleted = NamespacedHooks.useDispatch<number[]>(
    EntityClassMap.staticDeliveryAllocationItem,
    KEY_TYPES.DELETED
  );

  const dropCallback = useCallback(
    (
      item: StaticDeliveryAllocationItemDto,
      monitor: DropTargetMonitor<StaticDeliveryAllocationItemDto>
    ) => {
      const cycleSubspanIdList =
        cycleSubspanGroupMapCurrent[item.cycleSubspanGroupId];
      cycleSubspanIdList.forEach((csId) => {
        staticAllocationCellUpdater(undefined, csId);
      });
      dispatchDeleted((list) => [...list, item.id]);
    },
    [cycleSubspanGroupMapCurrent, staticAllocationCellUpdater, dispatchDeleted]
  );

  // Get drag data and functions
  const [{ isOver, canDrop, currentItem, currentItemType }, drop] = useDrop(
    () => ({
      accept: DragTypes.STATIC_ALLOCATION,
      drop: dropCallback,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        currentItem: monitor.getItem(),
        currentItemType: monitor.getItemType()
      }),
      canDrop: canDropCallback
    })
  );

  return drop(
    <div
      style={style}
      className={clsx(
        'flex overflow-hidden',
        currentItem && canDrop && 'animate-pulse bg-rose-200'
      )}
    >
      <Popover>
        <PopoverTrigger>
          <Button variant={'light'} className={'px-0.5'}>
            <DtoUiWrapper
              entityClass={EntityClassMap.workProjectSeriesSchema}
              entityId={rowId}
              renderAs={InnerWorkProjectSeriesSchemaCell}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <DtoUiWrapper
            entityClass={EntityClassMap.workProjectSeriesSchema}
            entityId={rowId}
            renderAs={StaticAllocationDispensor}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const MemoWorkProjectSeriesSchemaCell = memo(
  WorkProjectSeriesSchemaCell
);

const TWO_FIVE_SIX = Math.pow(2, 8);

const PRODUCTION_STATIC_CYCLE_ID = 1;

function getTransientStaticAllocationId(
  deliveryAllocation: DeliveryAllocationDto,
  used: number
) {
  return (deliveryAllocation.id * TWO_FIVE_SIX + used) * -1;
}

function getCount(unusedAllocation: StaticDeliveryAllocationItemDto) {
  return unusedAllocation.staticDeliveryAllocation.deliveryAllocation.count;
}

function getUsed(
  idToCounterMap: Map<string, AllocationCounter>,
  entity: WorkProjectSeriesSchemaDto,
  deliveryAllocationSize: number
) {
  return (
    idToCounterMap.get(
      `${getAllocationCounterId(entity.id, deliveryAllocationSize)}`
    )?.count ?? 0
  );
}

export function StaticAllocationDispensor({
  entity
}: BaseDtoUiProps<WorkProjectSeriesSchemaDto>) {
  const allocationCounterIds = useMemo(() => {
    return Object.values(entity.deliveryAllocations).map(
      (deliveryAllocation) => {
        return getAllocationCounterId(
          entity.id,
          deliveryAllocation.deliveryAllocationSize
        );
      }
    );
  }, [entity]);

  const { currentState: idToCounterMap } = useGlobalListener<
    Map<string, AllocationCounter>
  >({
    contextKey: allocationCounter,
    listenerKey: `StaticAllocationDispensor:${entity.id}`,
    initialValue: InitialMap as Map<string, AllocationCounter>
  });

  console.log(idToCounterMap);

  const unusedAllocations: StaticDeliveryAllocationItemDto[] = useMemo(() => {
    return Object.values(entity.deliveryAllocations).map(
      (deliveryAllocation) => {
        const used = getUsed(
          idToCounterMap,
          entity,
          deliveryAllocation.deliveryAllocationSize
        );
        return {
          id: getTransientStaticAllocationId(deliveryAllocation, used),
          cycleSubspanGroupId: '',
          staticDeliveryAllocation: {
            id: deliveryAllocation.id,
            cycleId: PRODUCTION_STATIC_CYCLE_ID,
            deliveryAllocation: deliveryAllocation
          },
          workProjectSeriesSchemaId:
            deliveryAllocation.workProjectSeriesSchemaId
        } as StaticDeliveryAllocationItemDto;
      }
    );
  }, [entity, idToCounterMap]);

  return (
    <table>
      <tbody>
        {unusedAllocations.map((unusedAllocation) => {
          const remaining =
            getCount(unusedAllocation) -
            getUsed(
              idToCounterMap,
              entity,
              getDeliveryAllocationSize(unusedAllocation)
            );
          return (
            <tr key={unusedAllocation.id}>
              <td>{remaining}</td>
              <td>
                <StaticAllocationDraggable
                  entity={unusedAllocation}
                  disabled={remaining === 0}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

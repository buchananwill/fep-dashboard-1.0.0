import {
  BaseDtoUiProps,
  DtoUiWrapper,
  NamespacedHooks,
  useWriteAnyDto
} from 'dto-stores';
import {
  StaticDeliveryAllocationItemDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types_';
import {
  CellWrapperProps,
  getCellIdReference
} from '@/components/grids/getCellIdReference';
import { EntityClassMap } from '@/api/entity-class-map';
import { memo, useCallback } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';
import clsx from 'clsx';
import { useStaticAllocationCellUpdater } from '@/components/work-project-series-schema/static-allocation/UseStaticAllocationCellUpdater';
import { useGlobalListener } from 'selective-context';
import { cycleSubspanGroupMap } from '@/components/work-project-series-schema/static-allocation/StaticAllocationTable';
import { ObjectPlaceholder } from '@/api/literals';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { Button, Popover } from '@mantine/core';
import { StaticAllocationDispensor } from '@/components/work-project-series-schema/StaticAllocationDispensor';

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

  const staticAllocationCellUpdater = useStaticAllocationCellUpdater(rowId!);
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
        'flex items-center overflow-hidden',
        currentItem && canDrop && 'animate-pulse bg-rose-200'
      )}
    >
      {rowId && (
        <Popover>
          <Popover.Target>
            <Button
              variant={'light'}
              radius={'xs'}
              classNames={{ label: 'leading-normal' }}
              styles={{ root: { padding: '4px 2px 4px' } }}
            >
              <DtoUiWrapper
                entityClass={EntityClassMap.workProjectSeriesSchema}
                entityId={rowId}
                renderAs={InnerWorkProjectSeriesSchemaCell}
              />
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <DtoUiWrapper
              entityClass={EntityClassMap.workProjectSeriesSchema}
              entityId={rowId}
              renderAs={StaticAllocationDispensor}
            />
          </Popover.Dropdown>
        </Popover>
      )}
    </div>
  );
}

export const MemoWorkProjectSeriesSchemaCell = memo(
  WorkProjectSeriesSchemaCell
);

import { EntityClassMap } from '@/api/entity-class-map';
import { SetRequired } from 'type-fest';
import { InnerCellContent } from '@/components/work-project-series-assignments/table-view/AssignmentCell';
import { useDtoStore } from 'dto-stores';
import {
  CycleSubspanWithJoinsListDto,
  StaticDeliveryAllocationItemDto
} from '@/api/generated-types/generated-types_';
import { getCellIdReference } from '@/components/grids/getCellIdReference';
import { memo, useMemo } from 'react';
import { matchIsFirst } from '@/components/work-schema/static-allocation/allocationDropZonePermissions';
import { StaticAllocationDraggable } from '@/components/work-schema/static-allocation/StaticAllocationDraggable';
import { getDeliveryAllocationSize } from '@/components/work-schema/static-allocation/StaticAllocationDropZone';
import { joinCellId } from '@/components/work-schema/static-allocation/createCell';
import classes from './staticAllocationCell.module.css';
import clsx from 'clsx';

const entityClass = EntityClassMap.staticDeliveryAllocationItem;

export function StaticAllocationOccupied(
  props: SetRequired<InnerCellContent<string>, 'cellData'>
) {
  const { cellData, columnIndex, rowIndex } = props;

  const { entity } = useDtoStore<StaticDeliveryAllocationItemDto>({
    entityId: cellData,
    entityClass,
    listenerKey: `${joinCellId(entityClass, rowIndex, columnIndex)}`
  });

  return entity ? <SafelyOccupied entity={entity} {...props} /> : null;
}

const DraggableMemo = memo(StaticAllocationDraggable);

function SafelyOccupied({
  entity,
  ...props
}: { entity: StaticDeliveryAllocationItemDto } & SetRequired<
  InnerCellContent<string>,
  'cellData'
>) {
  const { cellData, columnIndex, rowIndex, data } = props;

  const { columnId } = getCellIdReference({
    data,
    rowIndex,
    columnIndex
  });
  const deliveryAllocationSize = getDeliveryAllocationSize(entity);

  const { cycleSubspanGroupId } = entity;

  const { entity: cycleSubspan } = useDtoStore<CycleSubspanWithJoinsListDto>({
    entityId: columnId ?? NaN,
    entityClass: EntityClassMap.cycleSubspan,
    listenerKey: `cell:${rowIndex}:${columnIndex}`
  });

  const isDraggable = useMemo(() => {
    return matchIsFirst(
      cycleSubspan.cycleSubspanJoins,
      deliveryAllocationSize,
      cycleSubspanGroupId
    );
  }, [
    cycleSubspan.cycleSubspanJoins,
    deliveryAllocationSize,
    cycleSubspanGroupId
  ]);

  if (isDraggable) {
    return <DraggableMemo entity={entity} {...props} />;
  } else
    return (
      <div className={clsx(classes.staticItemCell, classes.tailCell)}></div>
    );
}

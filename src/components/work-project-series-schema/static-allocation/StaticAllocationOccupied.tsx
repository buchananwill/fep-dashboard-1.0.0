import { EntityClassMap } from '@/api/entity-class-map';
import { SetRequired } from 'type-fest';
import { InnerCellContent } from '@/components/work-project-series-assignments/table-view/AssignmentCell';
import { useDtoStore } from 'dto-stores';
import { StaticDeliveryAllocationItemDto } from '@/api/generated-types/generated-types';
import { joinCellId } from '@/components/work-project-series-schema/static-allocation/StaticAllocationTable';
import { getCellIdReference } from '@/components/grids/getCellIdReference';
import { CycleSubspanWithJoinsListDto } from '@/api/generated-types/generated-types';
import { memo, useMemo } from 'react';
import { matchIsFirst } from '@/components/work-project-series-schema/static-allocation/allocationDropZonePermissions';
import clsx from 'clsx';
import { defaultCellSize } from '@/components/grids/VirtualizedTableWindowed';
import { StaticAllocationDraggable } from '@/components/work-project-series-schema/static-allocation/StaticAllocationDraggable';
import { getDeliveryAllocationSize } from '@/components/work-project-series-schema/static-allocation/StaticAllocationDropZone';

const entityClass = EntityClassMap.staticDeliveryAllocationItem;

export function StaticAllocationOccupied(
  props: SetRequired<InnerCellContent<string>, 'cellData'>
) {
  const { cellData, columnIndex, rowIndex, data } = props;

  const { entity } = useDtoStore<StaticDeliveryAllocationItemDto>({
    entityId: cellData,
    entityClass,
    listenerKey: `${joinCellId(entityClass, rowIndex, columnIndex)}`
  });
  const { columnId } = getCellIdReference({
    data,
    rowIndex,
    columnIndex
  });
  const deliveryAllocationSize = getDeliveryAllocationSize(entity);

  const { entity: cycleSubspan } = useDtoStore<CycleSubspanWithJoinsListDto>({
    entityId: columnId,
    entityClass: EntityClassMap.cycleSubspan,
    listenerKey: `cell:${rowIndex}:${columnIndex}`
  });

  const isDraggable = useMemo(() => {
    return matchIsFirst(
      cycleSubspan.cycleSubspanJoins,
      deliveryAllocationSize,
      entity.cycleSubspanGroupId
    );
  }, [cycleSubspan, deliveryAllocationSize, entity.cycleSubspanGroupId]);

  if (isDraggable) {
    return <DraggableMemo entity={entity} {...props} />;
  } else
    return (
      <div
        className={clsx('h-[40px] bg-blue-500')}
        style={{ width: `${defaultCellSize}px` }}
      ></div>
    );
}

const DraggableMemo = memo(StaticAllocationDraggable);

import { EntityClassMap } from '@/api/entity-class-map';
import { SetRequired } from 'type-fest';
import { InnerCellContent } from '@/components/work-project-series-assignments/table-view/AssignmentCell';
import { useDtoStore } from 'dto-stores';
import { StaticDeliveryAllocationItemDto } from '@/api/zod-schemas/StaticDeliveryAllocationItemDtoSchema';
import { getCellId } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationTable';
import { getCellIdReference } from '@/components/tables/getCellIdReference';
import { CycleSubspanWithJoinsListDto } from '@/api/zod-schemas/CycleSubspanWithJoinsListDtoSchema_';
import { memo, useMemo } from 'react';
import { matchIsFirst } from '@/app/work-project-series-schemas/static-allocation/allocationDropZonePermissions';
import clsx from 'clsx';
import { defaultCellSize } from '@/components/tables/VirtualizedTableWindowed';
import { StaticAllocationDraggable } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationDraggable';
import { getDeliveryAllocationSize } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationDropZone';

const entityClass = EntityClassMap.staticDeliveryAllocationItem;

export function StaticAllocationOccupied(
  props: SetRequired<InnerCellContent<string>, 'cellData'>
) {
  const { cellData, columnIndex, rowIndex, data } = props;

  const { entity } = useDtoStore<StaticDeliveryAllocationItemDto>({
    entityId: cellData,
    entityClass,
    listenerKey: `${getCellId(entityClass, rowIndex, columnIndex)}`
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

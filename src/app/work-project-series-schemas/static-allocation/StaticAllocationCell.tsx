import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import { InnerCellContent } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { StaticDeliveryAllocationItemDto } from '@/api/dtos/StaticDeliveryAllocationItemDtoSchema';
import { StaticAllocationOccupied } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationDraggable';
import { StaticAllocationDropZone } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationDropZone';
import VirtualizedOuterCellV2 from '@/components/tables/VirtualizedCellV2';
import { EntityClassMap } from '@/api/entity-class-map';

export default function StaticAllocationCell(props: CellWrapperProps) {
  return (
    <VirtualizedOuterCellV2
      entityClass={EntityClassMap.staticDeliveryAllocationItem}
      {...props}
      innerCell={InnerStaticAllocationCell}
    />
  );
}

function InnerStaticAllocationCell({
  cellData,
  ...props
}: InnerCellContent<string | undefined>) {
  if (cellData === undefined) return <StaticAllocationDropZone {...props} />;
  else return <StaticAllocationOccupied {...props} cellData={cellData} />;
}

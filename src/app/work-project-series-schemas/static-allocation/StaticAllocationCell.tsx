import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import VirtualizedOuterCell from '@/components/tables/VirtualizedCell';
import { InnerCellContent } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { StaticDeliveryAllocationItemDto } from '@/api/dtos/StaticDeliveryAllocationItemDtoSchema';
import { StaticAllocationDraggable } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationDraggable';
import { StaticAllocationDropZone } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationDropZone';

export default function StaticAllocationCell(props: CellWrapperProps) {
  return (
    <VirtualizedOuterCell {...props} innerCell={InnerStaticAllocationCell} />
  );
}

function InnerStaticAllocationCell({
  cellData,
  ...props
}: InnerCellContent<StaticDeliveryAllocationItemDto | undefined>) {
  if (cellData === undefined) return <StaticAllocationDropZone {...props} />;
  else return <StaticAllocationDraggable {...props} cellData={cellData} />;
}

import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { InnerCellContent } from '@/components/work-project-assignments/table-view/AssignmentCell';
import { StaticAllocationDropZone } from '@/components/work-schema/static-allocation/StaticAllocationDropZone';
import VirtualizedOuterCellV2 from '@/components/grids/VirtualizedCellV2';
import { EntityClassMap } from '@/api/entity-class-map';
import { StaticAllocationOccupied } from '@/components/work-schema/static-allocation/StaticAllocationOccupied';

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
  else {
    return <StaticAllocationOccupied {...props} cellData={cellData} />;
  }
}

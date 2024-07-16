'use client';
import { ProviderRoleAvailabilityDto } from '@/api/dtos/ProviderRoleAvailabilityDtoSchema';
import clsx from 'clsx';
import { InnerCellContent } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/AssignmentCell';
import { GridChildComponentProps } from 'react-window';
import VirtualizedOuterCell, {
  CellWrapperProps
} from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/VirtualizedCell';

function getAvailabilityColor(availabilityCode: number) {
  switch (availabilityCode) {
    case 0:
      return 'bg-rose-400';
    case 1:
      return 'bg-emerald-400';
    case 2:
      return 'bg-amber-400';
    case 4:
      return 'bg-gray-400';
  }
}

function InnerAvailabilityCell({
  cellData
}: InnerCellContent<ProviderRoleAvailabilityDto>) {
  if (!cellData) return null;

  const bgColor = getAvailabilityColor(cellData.availabilityCode);

  return <div className={clsx(bgColor, 'h-full w-full')}></div>;
}

export default function AvailabilityCell(props: CellWrapperProps) {
  return <VirtualizedOuterCell innerCell={InnerAvailabilityCell} {...props} />;
}

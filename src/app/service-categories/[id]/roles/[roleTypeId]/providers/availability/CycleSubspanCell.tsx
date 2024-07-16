import { CellWrapperProps } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/VirtualizedCell';
import { BaseDtoUiProps } from 'dto-stores';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import DtoUiWrapperCell from '@/app/service-categories/[id]/roles/[roleTypeId]/providers/availability/DtoUiWrapperCell';
import { EntityClassMap } from '@/api/entity-class-map';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';
import { TooltipMemo } from '@/app/service-categories/[id]/roles/_components/SyncedCell';

export default function CycleSubspanCell(props: CellWrapperProps) {
  return (
    <DtoUiWrapperCell
      entityClass={EntityClassMap.cycleSubspan}
      InnerCell={InnerCycleSubspanCell}
      idKey={'columnId'}
      {...props}
    />
  );
}

function InnerCycleSubspanCell({ entity }: BaseDtoUiProps<CycleSubspanDto>) {
  const floatingTooltip = useFloatingTooltip(
    <TooltipMemo text={`${entity.zeroIndexedCycleDay + 1}: ${entity.name}`} />
  );

  return (
    <span
      className={'center-vertical-with-margin inline-block truncate'}
      {...floatingTooltip}
    >
      {entity.name}
    </span>
  );
}

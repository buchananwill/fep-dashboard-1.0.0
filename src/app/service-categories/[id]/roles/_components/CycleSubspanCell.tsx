import { BaseLazyDtoUiProps } from 'dto-stores';
import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';
import DtoUiWrapperCell from './DtoUiWrapperCell';
import { TooltipMemo } from '@/app/service-categories/[id]/roles/_components/SimpleTooltip';
import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import clsx from 'clsx';

export default function CycleSubspanCell(props: CellWrapperProps) {
  return (
    <DtoUiWrapperCell
      entityClass={EntityClassMap.cycleSubspan}
      InnerCell={InnerCycleSubspanCell}
      idKey={'columnId'}
      className={
        ''
        // (props.columnIndex + 1) % 6 === 0 ? 'border-r border-r-gray-700' : ''
      }
      {...props}
    />
  );
}

function InnerCycleSubspanCell({
  entity
}: BaseLazyDtoUiProps<CycleSubspanDto>) {
  const floatingTooltip = useFloatingTooltip(
    <TooltipMemo text={`${entity.zeroIndexedCycleDay + 1}: ${entity.name}`} />
  );

  return (
    <span
      className={clsx(
        'center-all-margin inline-block truncate',
        entity.dayOrdinal === 0 && 'bg-sky-300'
      )}
      {...floatingTooltip}
    >
      {entity.zeroIndexedCycleDay + 1}.{entity.dayOrdinal + 1}
    </span>
  );
}

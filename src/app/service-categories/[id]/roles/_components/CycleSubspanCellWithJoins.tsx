import { BaseLazyDtoUiProps } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';
import DtoUiWrapperCell from './DtoUiWrapperCell';
import { TooltipMemo } from '@/app/service-categories/[id]/roles/_components/SimpleTooltip';
import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import clsx from 'clsx';
import {
  CycleSubspanDto,
  CycleSubspanWithJoinsListDto
} from '@/api/generated-types/generated-types';

export default function CycleSubspanCellWithJoins(props: CellWrapperProps) {
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
}: BaseLazyDtoUiProps<CycleSubspanWithJoinsListDto>) {
  const floatingTooltip = useFloatingTooltip(
    <TooltipMemo
      text={`${entity.zeroIndexedCycleDay + 1}: ${entity?.timeSpan?.startTimeDivisionInstant}`}
    />
  );

  return (
    <span
      className={clsx(
        'center-all-margin inline-block truncate text-xs',
        entity.dayOrdinal === 0 && 'bg-sky-300'
      )}
      {...floatingTooltip}
    >
      {String(entity?.timeSpan?.startTimeDivisionInstant)}
      {/*{entity.zeroIndexedCycleDay + 1}.{entity.dayOrdinal + 1}*/}
    </span>
  );
}
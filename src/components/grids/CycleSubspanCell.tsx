import { BaseLazyDtoUiProps } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { usePopoverSingleton } from '@/components/tooltip/usePopoverSingleton';
import DtoUiWrapperCell from './DtoUiWrapperCell';
import { TooltipMemo } from '@/components/tooltip/SimpleTooltip';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import clsx from 'clsx';
import {
  CycleSubspanDto,
  CycleSubspansWithIndexAndDayOrdinal,
  CycleSubspanWithJoinsListDto
} from '@/api/generated-types/generated-types_';

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
}: BaseLazyDtoUiProps<CycleSubspansWithIndexAndDayOrdinal>) {
  const floatingTooltip = usePopoverSingleton(
    <TooltipMemo
      text={`${entity.zeroIndexedCycleDay + 1}: ${entity?.startTime}`}
    />
  );

  return (
    <span
      className={clsx(
        'center-all-margin inline-block truncate text-xs',
        entity.dayOrdinal === 1 && 'bg-sky-300'
      )}
      {...floatingTooltip}
    >
      {String(entity?.startTime)}
      {/*{entity.zeroIndexedCycleDay + 1}.{entity.dayOrdinal + 1}*/}
    </span>
  );
}

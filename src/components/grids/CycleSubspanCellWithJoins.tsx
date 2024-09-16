import { BaseLazyDtoUiProps } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { useFloatingTooltip } from '@/components/tooltip/useFloatingTooltip';
import DtoUiWrapperCell from './DtoUiWrapperCell';
import { TooltipMemo } from '@/components/tooltip/SimpleTooltip';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import clsx from 'clsx';
import {
  CycleSubspanDto,
  CycleSubspanWithJoinsListDto
} from '@/api/generated-types/generated-types';
import { useMemo } from 'react';

export default function CycleSubspanCellWithJoins(props: CellWrapperProps) {
  return (
    <DtoUiWrapperCell
      entityClass={EntityClassMap.cycleSubspan}
      InnerCell={InnerCycleSubspanCell}
      idKey={'columnId'}
      {...props}
    />
  );
}

function InnerCycleSubspanCell({
  entity
}: BaseLazyDtoUiProps<CycleSubspanWithJoinsListDto>) {
  console.log(entity);

  const entityDescription = useMemo(() => {
    return (
      entity?.timeSpan?.startTimeDivisionInstant ??
      `${entity.zeroIndexedCycleDay + 1}.${entity.dayOrdinal}`
    );
  }, [entity]);

  const floatingTooltip = useFloatingTooltip(
    <TooltipMemo text={entityDescription} />
  );

  return (
    <span
      className={clsx(
        'center-all-margin inline-block truncate text-xs',
        entity.dayOrdinal === 0 && 'bg-sky-300'
      )}
      {...floatingTooltip}
    >
      {String(entityDescription)}
      {/*{entity.zeroIndexedCycleDay + 1}.{entity.dayOrdinal + 1}*/}
    </span>
  );
}

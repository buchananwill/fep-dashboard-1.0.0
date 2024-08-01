import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import VirtualizedOuterCellV2 from '@/components/tables/VirtualizedCellV2';
import { EntityClassMap } from '@/api/entity-class-map';
import { InnerCellContent } from '@/components/work-project-series-assignments/AssignmentCell';
import { useLazyDtoListListener } from 'dto-stores';
import { EmptyArray } from '@/api/literals';
import { WorkProjectSeriesMetricDto } from '@/api/generated-types/generated-types_';
import { useMemo } from 'react';
import { clamp, round } from 'lodash';
import VirtualizedOuterCell from '@/components/tables/VirtualizedCell';
import { interpolateRgb, interpolateRgbBasis } from 'd3';

export default function WorkProjectSeriesBuildMetricCell(
  props: CellWrapperProps
) {
  return (
    <VirtualizedOuterCell
      {...props}
      innerCell={InnerCell}
      // entityClass={EntityClassMap.workProjectSeriesMetric}
    />
  );
}

function InnerCell({ cellData }: InnerCellContent<number[]>) {
  const { currentState } = useLazyDtoListListener<WorkProjectSeriesMetricDto>(
    cellData ?? EmptyArray,
    EntityClassMap.workProjectSeriesMetric
  );

  const netCountSumLog = useMemo(() => {
    const netCountSum = [...currentState.values()]
      .map((dto) => dto.finiteCostCount - dto.infinityCostCount)
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    const log10 =
      netCountSum === 0 ? 0 : Math.log10(Math.abs(netCountSum / 10));
    const rounded = round(log10, 2);
    return netCountSum < 0 ? rounded * -1 : rounded;
  }, [currentState]);

  const bgColor = useMemo(() => {
    const clampedValue = clamp(netCountSumLog, -1, 1);
    return clampedValue > 0
      ? WhGrScheme(clampedValue)
      : WhReScheme(clampedValue * -1);
  }, [netCountSumLog]);

  return (
    <div
      className={'flex h-full w-full items-center justify-end p-1 font-mono'}
      style={{ backgroundColor: bgColor }}
    >
      {netCountSumLog.toFixed(1)}
    </div>
  );
}

const WhReScheme = interpolateRgb('white', 'red');
const WhGrScheme = interpolateRgb('white', 'green');

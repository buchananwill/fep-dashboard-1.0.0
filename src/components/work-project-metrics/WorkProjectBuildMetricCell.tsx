'use client';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import VirtualizedOuterCellV2 from '@/components/grids/VirtualizedCellV2';
import { EntityClassMap } from '@/api/entity-class-map';
import { InnerCellContent } from '@/components/work-project-assignments/table-view/AssignmentCell';
import { EmptyArray } from '@/api/client-literals';
import { WorkProjectMetricDto } from '@/api/generated-types/generated-types_';
import { useMemo, useRef } from 'react';
import { clamp, round } from 'lodash';
import VirtualizedOuterCell from '@/components/grids/VirtualizedCell';
import { interpolateRgb, interpolateRgbBasis } from 'd3';
import { useLazyDtoListListener } from 'dto-stores';

export default function WorkProjectBuildMetricCell(props: CellWrapperProps) {
  return (
    <VirtualizedOuterCell
      {...props}
      innerCell={InnerCell}
      // entityClass={EntityClassMap.workProjectMetric}
    />
  );
}

function InnerCell({ cellData }: InnerCellContent<number[]>) {
  const { currentState } = useLazyDtoListListener<WorkProjectMetricDto>(
    cellData ?? EmptyArray,
    EntityClassMap.workProjectMetric
  );

  // const currentState = useMemo(() => {
  //   return new Map();
  // }, []);

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

import {
  WorkProjectSeriesNodeLinkDto,
  WorkProjectSeriesWithSchemaLabelsDto
} from '@/api/generated-types/generated-types';
import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { InnerWorkProjectSeriesCell } from '@/components/work-project-series-metrics/WorkProjectSeriesCell';
import { EntityClassMap } from '@/api/entity-class-map';
import { Loading } from '@/components/feasibility-report/AssignmentFeasibilityTreeItem';
import React from 'react';
import { getValue } from '@/functions/allowingNestedFiltering';

export function WorkProjectSeriesNodeLink({
  nodeLink: { workProjectSeriesId }
}: {
  nodeLink: WorkProjectSeriesNodeLinkDto;
}) {
  return (
    <LazyDtoUiWrapper
      renderAs={WorkProjectSeries}
      entityId={workProjectSeriesId}
      entityClass={EntityClassMap.workProjectSeries}
      whileLoading={Loading}
    />
  );
}

function WorkProjectSeries({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesWithSchemaLabelsDto>) {
  return getValue(entity, 'workProjectSeriesSchema.workTaskType.name');
}

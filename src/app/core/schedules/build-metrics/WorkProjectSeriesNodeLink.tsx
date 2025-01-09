import {
  WorkProjectSeriesNodeLinkDto,
  WorkProjectSeriesWithSchemaLabelsDto
} from '@/api/generated-types/generated-types_';
import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { InnerWorkProjectSeriesCell } from '@/components/work-project-series-metrics/WorkProjectSeriesCell';
import { EntityClassMap } from '@/api/entity-class-map';
import React from 'react';
import { getValue } from '@/functions/allowingNestedFiltering';
import { Loading } from '@/components/feasibility-report/Loading';

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
  const kdName = getValue(entity, 'workType.knowledgeDomain.name');
  const kLName = getValue(entity, 'workType.knowledgeLevel.name');
  return `${kdName}: ${kLName}`;
}

import {
  QueueTreeNodeTaskDto,
  TaskSourceEntitySummaryDto,
  WorkProjectNodeLinkDto,
  WorkProjectWithSchemaLabelsDto
} from '@/api/generated-types/generated-types_';
import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { InnerWorkProjectCell } from '@/components/work-project-metrics/WorkProjectCell';
import { EntityClassMap } from '@/api/entity-class-map';
import React from 'react';
import { getValue } from '@/functions/allowingNestedFiltering';
import { Loading } from '@/components/feasibility-report/Loading';

export function QueueTreeNodeTask({
  nodeTask
}: {
  nodeTask: QueueTreeNodeTaskDto;
}) {
  console.log({ nodeTask });

  return (
    <LazyDtoUiWrapper
      renderAs={TaskSourceEntity}
      entityId={nodeTask.taskSourceEntityId}
      entityClass={'TaskSourceEntitySummary'}
      whileLoading={Loading}
    />
  );
}

function TaskSourceEntity({
  entity
}: BaseLazyDtoUiProps<TaskSourceEntitySummaryDto>) {
  const kdName = getValue(entity, 'knowledgeDomainName');
  const kLName = getValue(entity, 'knowledgeLevelName');
  return `${kdName}: ${kLName}`;
}

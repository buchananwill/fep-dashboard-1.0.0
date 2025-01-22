import { getLastNVariables } from '@/functions/getLastNVariables';
import { Api } from '@/api/clientApi_';
import BuildMetricTable from '@/app/core/schedules/build-metrics/BuildMetricTable';
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import { EmptyArray } from '@/api/client-literals';
import { EntityClassMap } from '@/api/entity-class-map';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import {
  TaskSourceEntitySummaryDto,
  WorkProjectWithSchemaLabelsDto
} from '@/api/generated-types/generated-types_';
import { LinkButton } from '@/components/navigation/LinkButton';
import React from 'react';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';

export default async function BuildMetricTablePage({
  pathVariables
}: LeafComponentProps) {
  const [buildMetricId] = getLastNVariables(pathVariables, 1);
  const buildMetric = await Api.BuildMetric.getOne(parseInt(buildMetricId));

  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={getTaskSourceEntitySummaries}
        entityClass={'TaskSourceEntitySummary'}
      />
      <BuildMetricTable buildMetric={buildMetric} />
      <LinkButton
        href={`/core/${pathVariables.map((variable) => (variable === 'build-metric-table' ? 'build-metric-queue-tree-graph' : variable)).join('/')}`}
      >
        Queue Tree Graph
      </LinkButton>
    </RootCard>
  );
}

const getTaskSourceEntitySummaries = async (idList: number[]) => {
  'use server';

  const url = constructUrl(['/task-source-entity-summaries']);
  console.log({ url });
  return postEntitiesWithDifferentReturnType<
    number[],
    TaskSourceEntitySummaryDto[]
  >(idList, url);
};

import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { Api } from '@/api/clientApi_';
import BuildMetricTable from '@/app/core/schedules/build-metrics/BuildMetricTable';
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import { EmptyArray } from '@/api/literals';
import { EntityClassMap } from '@/api/entity-class-map';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { WorkProjectSeriesWithSchemaLabelsDto } from '@/api/generated-types/generated-types';
import { LinkButton } from '@/components/navigation/LinkButton';
import React from 'react';

export default async function BuildMetricTablePage({
  pathVariables
}: LeafComponentProps) {
  const [buildMetricId] = getLastNVariables(pathVariables, 1);
  const buildMetric = await Api.BuildMetric.getOne(parseInt(buildMetricId));

  return (
    <div className={'flex flex-col items-center gap-2'}>
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={getWorkProjectSeriesByIdWithSchemaLabels}
        entityClass={EntityClassMap.workProjectSeries}
      />
      <BuildMetricTable buildMetric={buildMetric} />
      <LinkButton
        href={`/core/${pathVariables.map((variable) => (variable === 'build-metric-table' ? 'build-metric-queue-tree-graph' : variable)).join('/')}`}
      >
        Queue Tree Graph
      </LinkButton>
    </div>
  );
}

const getWorkProjectSeriesByIdWithSchemaLabels = async (idList: string[]) => {
  'use server';
  return postEntitiesWithDifferentReturnType<
    string[],
    WorkProjectSeriesWithSchemaLabelsDto[]
  >(
    idList,
    constructUrl(['/api/v2/workProjectSeries', 'byIdWithSchemaLabels'])
  );
};

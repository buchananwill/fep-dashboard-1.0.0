import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { Api } from '@/api/clientApi_';
import BuildMetricQueueTreeGraph from '@/app/core/schedules/build-metrics/BuildMetricQueueTreeGraph';
import { LinkButton } from '@/components/navigation/LinkButton';
import React from 'react';

export default async function BuildMetricQueueTreeGraphPage({
  pathVariables
}: LeafComponentProps) {
  const [buildMetricId] = getLastNVariables(pathVariables, 1);
  const buildMetric = await Api.BuildMetric.getOne(buildMetricId);

  return (
    <>
      <BuildMetricQueueTreeGraph data={buildMetric} />{' '}
      <LinkButton
        href={`/core/${pathVariables
          .map((variable) =>
            variable === 'build-metric-queue-tree-graph'
              ? 'build-metric-table'
              : variable
          )
          .join('/')}`}
      >
        Build Metric Table
      </LinkButton>
    </>
  );
}

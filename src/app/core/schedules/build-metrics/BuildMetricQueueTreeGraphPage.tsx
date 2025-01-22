import { getLastNVariables } from '@/functions/getLastNVariables';
import { Api } from '@/api/clientApi_';
import { LinkButton } from '@/components/navigation/LinkButton';
import React from 'react';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { GraphTabs } from '@/app/core/schedules/build-metrics/GraphTabs';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { Paper } from '@mantine/core';

export async function BuildMetricQueueTreeGraphPage({
  pathVariables
}: LeafComponentProps) {
  const [buildMetricId] = getLastNVariables(pathVariables, 1);
  console.log(Date.now());
  const buildMetric = await Api.BuildMetric.getOne(parseInt(buildMetricId));
  console.log(Date.now());
  console.log(buildMetric);
  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <Paper p={'md'}>
        <GraphTabs buildMetric={buildMetric} />
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
      </Paper>
    </RootCard>
  );
}

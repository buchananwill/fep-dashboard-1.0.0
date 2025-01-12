'use client';
import { BuildMetricDto } from '@/api/generated-types/generated-types_';
import { Tabs } from '@mantine/core';
import { BuildMetricNodeNetFailureGraph } from '@/app/core/schedules/build-metrics/BuildMetricNodeNetFailureGraph';
import { BuildMetricQueueProgressGraph } from '@/app/core/schedules/build-metrics/BuildMetricQueueProgressGraph';

export function GraphTabs({ buildMetric }: { buildMetric: BuildMetricDto }) {
  return (
    <Tabs defaultValue={'net-failure'}>
      <Tabs.List>
        <Tabs.Tab value={'net-failure'}>Net Failure Graph</Tabs.Tab>
        <Tabs.Tab value={'queue-progress'}>Queue Progress Graph</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value={'net-failure'}>
        <BuildMetricNodeNetFailureGraph data={buildMetric} />
      </Tabs.Panel>
      <Tabs.Panel value={'queue-progress'}>
        <BuildMetricQueueProgressGraph data={buildMetric} />
      </Tabs.Panel>
    </Tabs>
  );
}

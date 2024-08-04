import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { Api } from '@/api/clientApi_';
import { parseTen } from '@/api/date-and-time';
import BuildMetricQueueTreeGraph from '@/app/core/scheduling/build-metrics/BuildMetricQueueTreeGraph';

export default async function BuildMetric({
  pathVariables
}: LeafComponentProps) {
  const [buildMetricId] = getLastNVariables(pathVariables, 1);
  const buildMetric = await Api.BuildMetric.getOne(buildMetricId);

  return <BuildMetricQueueTreeGraph data={buildMetric} />;
}

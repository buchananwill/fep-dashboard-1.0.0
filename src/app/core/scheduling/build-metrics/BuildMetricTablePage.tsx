import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { Api } from '@/api/clientApi_';
import BuildMetricTable from '@/app/core/scheduling/build-metrics/BuildMetricTable';

export default async function BuildMetricTablePage({
  pathVariables
}: LeafComponentProps) {
  const [buildMetricId] = getLastNVariables(pathVariables, 1);
  const buildMetric = await Api.BuildMetric.getOne(buildMetricId);

  return <BuildMetricTable buildMetric={buildMetric} />;
}

import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';

async function WorkProjectSeriesMetricsPage({
  pathVariables
}: LeafComponentProps) {
  const [scheduleId] = getLastNVariables(pathVariables, 1);
}

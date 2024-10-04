import { Api } from '@/api/clientApi_';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import BuildMetricQueueTreeGraphPage from '@/app/core/schedules/build-metrics/BuildMetricQueueTreeGraphPage';
import { WorkProjectSeriesMetricsPage } from '@/components/work-project-series-metrics/WorkProjectSeriesMetrics';
import BuildMetricTablePage from '@/app/core/schedules/build-metrics/BuildMetricTablePage';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

async function BuildMetricListHome({}: LeafComponentProps) {
  const strings = await Api.BuildMetric.getIdList();
  return (
    <>
      {strings.map((stringId) => (
        <div key={stringId}>
          <div
            className={
              'pointer-events-none inline-block rounded-xl border px-2 text-default-500'
            }
          >
            Metric Id: {stringId}
          </div>
          <LinkButton
            href={`/core/schedules/build-metric-queue-tree-graph/${stringId}`}
          >
            Overall Build Timeline
          </LinkButton>
          <LinkButton href={`/core/schedules/build-metric-table/${stringId}`}>
            Build Metric Table
          </LinkButton>
          <LinkButton
            href={`/core/schedules/work-project-series-metrics/${stringId}`}
          >
            Work Project Series Heat Map
          </LinkButton>
        </div>
      ))}
    </>
  );
}

export const BuildMetricQueueTreeGraphFallback = getPathVariableSplitComponent(
  BuildMetricListHome,
  BuildMetricQueueTreeGraphPage
);
export const BuildMetricTableFallback = getPathVariableSplitComponent(
  BuildMetricListHome,
  BuildMetricTablePage
);
export const WorkProjectSeriesMetricFallback = getPathVariableSplitComponent(
  BuildMetricListHome,
  WorkProjectSeriesMetricsPage
);

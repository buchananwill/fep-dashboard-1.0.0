import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import BuildMetric from '@/app/core/scheduling/build-metrics/BuildMetric';
import { WorkProjectSeriesMetricsPage } from '@/components/work-project-series-metrics/WorkProjectSeriesMetrics';

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
          <LinkButton href={`/core/scheduling/build-metric/${stringId}`}>
            Overall Build Timeline
          </LinkButton>
          <LinkButton
            href={`/core/scheduling/work-project-series-metrics/${stringId}`}
          >
            Work Project Series Heat Map
          </LinkButton>
        </div>
      ))}
    </>
  );
}

export const BuildMetricFallback = getPathVariableSplitComponent(
  BuildMetricListHome,
  BuildMetric
);
export const WorkProjectSeriesMetricFallback = getPathVariableSplitComponent(
  BuildMetricListHome,
  WorkProjectSeriesMetricsPage
);

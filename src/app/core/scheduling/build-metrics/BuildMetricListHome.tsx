import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import BuildMetric from '@/app/core/scheduling/build-metrics/BuildMetric';

async function BuildMetricListHome({}: LeafComponentProps) {
  const strings = await Api.BuildMetric.getIdList();
  return (
    <>
      {strings.map((stringId) => (
        <div key={stringId}>
          <LinkButton href={`/core/scheduling/build-metric/${stringId}`}>
            Build Metric
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

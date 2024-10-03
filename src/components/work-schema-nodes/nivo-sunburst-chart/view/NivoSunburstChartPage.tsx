import { WorkNodeResponsiveSunburst } from '@/components/work-schema-nodes/nivo-sunburst-chart/WorkNodeResponsiveSunburst';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { NestedWorkNodeDto } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import WorkSchemaNodesHome from '@/components/work-schema-nodes/WorkSchemaNodesHome';
import { colorizeKnowledgeDomainGroups } from '@/components/work-schema-nodes/nivo-sunburst-chart/view/colorizeKnowledgeDomains';
import { camelCase } from 'lodash';
import { isNotUndefined } from '@/api/main';

async function NivoSunburstChartPage({ pathVariables }: LeafComponentProps) {
  const [chartType] = getLastNVariables(pathVariables, 2);
  const param =
    camelCase(chartType) === 'byKnowledgeLevelSeries'
      ? '?workTaskTypeName=Teaching'
      : undefined;
  const { data } = await getWithoutBody<NestedWorkNodeDto>(
    `${constructUrl([
      '/api/v2',
      ...pathVariables.map(camelCase)
    ])}${param ?? ''}`
  );

  const colorizeKnowledgeDomains1 = colorizeKnowledgeDomainGroups(data);
  return (
    <div className={'h-[80vh] w-[80vw]'}>
      <WorkNodeResponsiveSunburst data={colorizeKnowledgeDomains1} />
    </div>
  );
}

export const SunburstChartHome = getPathVariableSplitComponent(
  WorkSchemaNodesHome,
  NivoSunburstChartPage
);

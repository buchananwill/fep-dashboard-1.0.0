import { WorkNodeResponsiveSunburst } from '@/components/work-schema-nodes/nivo-sunburst-chart/WorkNodeResponsiveSunburst';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import {
  KnowledgeLevelSeriesGroup,
  NestedWorkNodeDto
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import WorkSchemaNodesHome from '@/components/work-schema-nodes/WorkSchemaNodesHome';
import { colorizeKnowledgeDomains } from '@/components/work-schema-nodes/nivo-sunburst-chart/view/colorizeKnowledgeDomains';

const nestedBundleEndpoint = (rootId: string) =>
  constructUrl(
    ['/api/v2', 'workSchemaNode', 'nestedWorkSchemaNodeGraph'],
    String(rootId)
  );

export const getLevelSeriesTree = (id: string) =>
  constructUrl(
    `/api/v2/workSchemaNode/nestedWorkSchemaNodeGraph/byKnowledgeLevelSeries/${id}?workTaskTypeName=Teaching`
  );

async function NivoSunburstChartPage({ pathVariables }: LeafComponentProps) {
  const [rootId] = getLastNVariables(pathVariables, 1);
  // const dtoData = await getWithoutBody<NestedWorkNodeDto>(
  //   nestedBundleEndpoint(rootId)
  // );
  //
  const { data } = await getWithoutBody<
    NestedWorkNodeDto<KnowledgeLevelSeriesGroup>
  >(getLevelSeriesTree('1'));

  const colorizeKnowledgeDomains1 = colorizeKnowledgeDomains(data);
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

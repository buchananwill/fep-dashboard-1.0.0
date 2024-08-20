import { WorkNodeResponsiveSunburst } from '@/components/work-schema-nodes/nivo-sunburst-chart/ResponsiveSunburst';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { NestedWorkNodeDto } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import WorkSchemaNodesHome from '@/components/work-schema-nodes/WorkSchemaNodesHome';

const nestedBundleEndpoint = (rootId: string) =>
  constructUrl(
    ['/api/v2', 'workSchemaNode', 'nestedWorkSchemaNodeGraph'],
    String(rootId)
  );

async function NivoSunburstChartPage({ pathVariables }: LeafComponentProps) {
  const [rootId] = getLastNVariables(pathVariables, 1);
  const dtoData = await getWithoutBody<NestedWorkNodeDto>(
    nestedBundleEndpoint(rootId)
  );
  const { data } = dtoData;
  return (
    <div className={'h-[100vh] w-[100vw]'}>
      <WorkNodeResponsiveSunburst data={data} />
    </div>
  );
}

export const SunburstChartHome = getPathVariableSplitComponent(
  WorkSchemaNodesHome,
  NivoSunburstChartPage
);

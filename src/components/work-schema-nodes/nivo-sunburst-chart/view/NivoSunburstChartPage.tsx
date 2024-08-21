import { WorkNodeResponsiveSunburst } from '@/components/work-schema-nodes/nivo-sunburst-chart/ResponsiveSunburst';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import {
  KnowledgeDomainGroup,
  NestedWorkNode,
  NestedWorkNodeDto
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import WorkSchemaNodesHome from '@/components/work-schema-nodes/WorkSchemaNodesHome';
import { streamedLessons } from '@/utils/init-json-data/arts-college/lesson-hierarchy';
import { interpolateRainbow } from 'd3';

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
    <div className={'h-[80vh] w-[80vw]'}>
      <WorkNodeResponsiveSunburst data={getAbilityStreamedLessons()} />
    </div>
  );
}

export const SunburstChartHome = getPathVariableSplitComponent(
  WorkSchemaNodesHome,
  NivoSunburstChartPage
);

const getAbilityStreamedLessons = () => {
  let node = streamedLessons;
  const kdgMap = new Map<string, KnowledgeDomainGroup[]>();
  for (let child of node.children) {
    for (let bundleChild of child.children) {
      for (let kdgChild of bundleChild.children) {
        const kdStringCode = kdgChild.knowledgeDomains
          .map((kd) => kd.shortCode)
          .toSorted((a, b) => a.localeCompare(b))
          .join(',');
        let list = kdgMap.get(kdStringCode);
        if (list === undefined) {
          list = [] as KnowledgeDomainGroup[];
          kdgMap.set(kdStringCode, list);
        }
        list.push(kdgChild);
      }
    }
  }
  const differentKCount = kdgMap.size;
  let colorScale = 0;
  for (let kdgList of kdgMap.values()) {
    const color = interpolateRainbow(colorScale / differentKCount);
    for (let kdgListElement of kdgList) {
      kdgListElement.color = color;
    }
    colorScale++;
  }
  return streamedLessons;
};

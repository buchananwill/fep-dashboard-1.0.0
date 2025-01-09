import { WorkNodeResponsiveSunburst } from '@/components/work-schema-nodes/nivo-sunburst-chart/WorkNodeResponsiveSunburst';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { NestedWorkNodeDto } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import WorkSchemaNodesHome from '@/components/work-schema-nodes/WorkSchemaNodesHome';
import { colorizeKnowledgeDomainGroups } from '@/components/work-schema-nodes/nivo-sunburst-chart/view/colorizeKnowledgeDomains';
import { camelCase } from 'lodash';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import SelectionController from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/SelectionController';
import React from 'react';

async function NivoSunburstChartPage({ pathVariables }: LeafComponentProps) {
  const ignoreMoreThanFourVariableUntilKnowledgeLevelIsImplemented =
    pathVariables.slice(0, 4);
  const [chartType] = getLastNVariables(
    ignoreMoreThanFourVariableUntilKnowledgeLevelIsImplemented,
    2
  );
  const param =
    camelCase(chartType) === 'byKnowledgeLevelSeries'
      ? '?workTypeCategory=Teaching'
      : undefined;
  const { data } = await getWithoutBody<NestedWorkNodeDto>(
    `${constructUrl([
      '/api/v2',
      ...ignoreMoreThanFourVariableUntilKnowledgeLevelIsImplemented.map(
        camelCase
      )
    ])}${param ?? ''}`
  );

  const colorizeKnowledgeDomains1 = colorizeKnowledgeDomainGroups(data);
  return (
    <div className={'h-[80vh] w-[80vw]'}>
      <SelectionController
        initialKnowledgeLevelSeriesGroup={
          colorizeKnowledgeDomains1.type === 'knowledgeLevelSeriesGroup'
            ? colorizeKnowledgeDomains1
            : undefined
        }
      />
      <WorkNodeResponsiveSunburst data={colorizeKnowledgeDomains1} />
    </div>
  );
}

export const SunburstChartByRootIdHome = getPathVariableSplitComponent(
  WorkSchemaNodesHome,
  NivoSunburstChartPage
);
export const SunburstChartByKnowledgeLevelSeries =
  getPathVariableSplitComponent(
    KnowledgeLevelSeriesLinks,
    NivoSunburstChartPage
  );

import { EntityClassMap } from '@/api/entity-class-map';
import { Api } from '@/api/clientApi_';
import {
  EditAddDeleteDtoControllerArray,
  MasterMapController
} from 'dto-stores';
import { getNames } from '@/components/work-task-types/getNamesServerAction';

import CycleDataFetcher from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CycleDataFetcher';
import SunburstEditView from '@/components/work-schema-nodes/nivo-sunburst-chart/create/SunburstEditView';
import EditorPanel from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditorPanel';
import { getWithoutBody } from '@/api/actions/template-actions';
import {
  KnowledgeLevelSeriesGroup,
  NestedWorkNodeDto
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { getLevelSeriesTree } from '@/components/work-schema-nodes/nivo-sunburst-chart/view/NivoSunburstChartPage';
import KnowledgeLevelSeriesGroupManager from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import SelectionCallout from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/SelectionCallout';
import { colorizeKnowledgeDomains } from '@/components/work-schema-nodes/nivo-sunburst-chart/view/colorizeKnowledgeDomains';

export const workTaskTypeName = 'workTaskTypeName';
export default async function CreateViaSunburst() {
  const { data } = await getWithoutBody<
    NestedWorkNodeDto<KnowledgeLevelSeriesGroup>
  >(getLevelSeriesTree('2'));

  const colorized = colorizeKnowledgeDomains(
    data as KnowledgeLevelSeriesGroup
  ) as KnowledgeLevelSeriesGroup;

  const knowledgeDomains = await Api.KnowledgeDomain.getAll();

  const knowledgeLevelDtos = await Api.KnowledgeLevel.getDtoListByExampleList([
    { knowledgeLevelSeriesId: 2 }
  ]);
  const workTaskTypesNames = await getNames();
  const cycleList = await Api.Cycle.getAll();

  return (
    <div className={'flex h-[100vh] w-[100vw] p-8'}>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeDomain}
        dtoList={knowledgeDomains}
      />
      <MasterMapController entityClass={EntityClassMap.knowledgeDomain} />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeLevel}
        dtoList={knowledgeLevelDtos}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycle}
        dtoList={cycleList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={workTaskTypeName}
        dtoList={workTaskTypesNames}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={workTaskTypesNames}
      />
      <div className={'h-[100%] w-[55%]'}>
        <SunburstEditView knowledgeLevelSeriesGroup={colorized} />
      </div>
      <EditorPanel initialKnowledgeLevelSeriesGroup={colorized} />
      <KnowledgeLevelSeriesGroupManager initialGroup={colorized} />
      <SelectionCallout />
      <CycleDataFetcher />
    </div>
  );
}

import { EntityClassMap } from '@/api/entity-class-map';
import { Api } from '@/api/clientApi_';
import {
  EditAddDeleteDtoControllerArray,
  MasterMapController
} from 'dto-stores';
import { getNames } from '@/components/work-types/getNamesServerAction';

import CycleDataFetcher from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CycleDataFetcher';
import SunburstEditView from '@/components/work-schema-nodes/nivo-sunburst-chart/create/SunburstEditView';
import EditorPanel from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditorPanel';
import KnowledgeLevelSeriesGroupManager from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import SelectionCallout from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/SelectionCallout';
import { initDefaults } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/templateKnowledgeLevelSeriesGroup';
import { get } from 'lodash';

export const workTypeCategory = 'workTypeCategory';
export default async function CreateViaSunburst() {
  const knowledgeDomains = await Api.KnowledgeDomain.getAll();

  const knowledgeLevelSeriesDtoList = await Api.KnowledgeLevelSeries.getAll();
  const workTypesNames = await getNames();
  const cycleList = await Api.Cycle.getAll();

  const defaultKnowledgeLevelSeriesGroup = initDefaults({
    cycle: get(cycleList, 0),
    knowledgeLevelSeries: get(knowledgeLevelSeriesDtoList, 0),
    workTypeCategory: get(workTypesNames, 0)
  });
  const knowledgeLevelDtos = knowledgeLevelSeriesDtoList.flatMap(
    (kls) => kls.knowledgeLevels
  );

  return (
    <div className={'flex h-[100vh] w-[100vw] p-8'}>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeDomain}
        dtoList={knowledgeDomains}
      />
      <MasterMapController entityClass={EntityClassMap.knowledgeDomain} />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeLevelSeries}
        dtoList={knowledgeLevelSeriesDtoList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeLevel}
        dtoList={knowledgeLevelDtos}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycle}
        dtoList={cycleList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={workTypeCategory}
        dtoList={workTypesNames}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={workTypesNames}
      />
      <div className={'h-[100%] w-[55%]'}>
        <SunburstEditView
          knowledgeLevelSeriesGroup={defaultKnowledgeLevelSeriesGroup}
        />
      </div>
      <EditorPanel
        initialKnowledgeLevelSeriesGroup={defaultKnowledgeLevelSeriesGroup}
      />
      <KnowledgeLevelSeriesGroupManager
        initialGroup={defaultKnowledgeLevelSeriesGroup}
      />
      <SelectionCallout />
      <CycleDataFetcher />
    </div>
  );
}

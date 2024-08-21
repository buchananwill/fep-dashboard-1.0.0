import { EntityClassMap } from '@/api/entity-class-map';
import { Api } from '@/api/clientApi_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { getNames } from '@/components/work-task-types/getNamesServerAction';
import TopLevelSelectors from '@/components/work-schema-nodes/nivo-sunburst-chart/create/TopLevelSelectors';
import KnowledgeLevelGroupManager, {
  K_D_TEMPLATE_ID
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import CycleDataFetcher from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CycleDataFetcher';
import SunburstEditView from '@/components/work-schema-nodes/nivo-sunburst-chart/create/SunburstEditView';
import NestedWorkNodeChildSelector from '@/components/work-schema-nodes/nivo-sunburst-chart/create/NestedWorkNodeChildSelector';
import EditorPanel from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditorPanel';

export const workTaskTypeName = 'workTaskTypeName';
export default async function CreateViaSunburst() {
  const knowledgeLevelDtos = await Api.KnowledgeLevel.getDtoListByExampleList([
    { knowledgeLevelSeriesId: 2 }
  ]);
  const workTaskTypesNames = await getNames();
  const cycleList = await Api.Cycle.getAll();

  return (
    <div className={'flex'}>
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
      <TopLevelSelectors />
      <SunburstEditView />
      <EditorPanel />
      <KnowledgeLevelGroupManager />
      <CycleDataFetcher />
    </div>
  );
}

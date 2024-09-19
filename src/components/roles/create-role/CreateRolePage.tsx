import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import WorkTaskTypeMatrix from '@/components/work-task-types/WorkTaskTypeMatrix';
import FinderTableButton from '@/components/tables/FinderTableButton';
import SuitabilityCellManager from '@/components/roles/suitability/SuitabilityCellManager';
import { getIdList } from '@/functions/getIdList';
import { Tabs } from '@nextui-org/tabs';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { getNames } from '@/components/work-task-types/getNamesServerAction';
import { Tab } from '@nextui-org/react';
import CreateRoleTabs from '@/components/roles/create-role/CreateRoleTabs';
import { Card } from '@nextui-org/card';

export default async function CreateRolePage({
  pathVariables
}: LeafComponentProps) {
  const [roleType] = getLastNVariables(pathVariables, 2);
  const knowledgeDomainDtos = await Api.KnowledgeDomain.getAll();
  const knowledgeLevelSeriesDtos = await Api.KnowledgeLevelSeries.getAll();
  const workTaskTypeNames = await getNames();
  const initialKnowledgeLevels =
    knowledgeLevelSeriesDtos.length > 0
      ? knowledgeLevelSeriesDtos[0].knowledgeLevels
      : EmptyArray;

  const kdIdList = getIdList(knowledgeDomainDtos);
  const kLIdList = getIdList(initialKnowledgeLevels);

  return (
    <div className={'h-[100vh] w-[100vw] p-4'}>
      <SuitabilityCellManager rowIdList={kdIdList} columnIdList={kLIdList} />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeDomain}
        dtoList={knowledgeDomainDtos}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeLevelSeries}
        dtoList={knowledgeLevelSeriesDtos}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeLevel}
        dtoList={initialKnowledgeLevels}
      />

      <CreateRoleTabs
        knowledgeDomains={knowledgeDomainDtos}
        knowledgeLevels={initialKnowledgeLevels}
      />
    </div>
  );
}

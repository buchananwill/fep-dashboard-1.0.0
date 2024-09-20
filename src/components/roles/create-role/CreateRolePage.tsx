import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import SuitabilityCellManager from '@/components/roles/suitability/SuitabilityCellManager';
import { getIdList } from '@/functions/getIdList';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { getNames } from '@/components/work-task-types/getNamesServerAction';
import CreateRoleTabs from '@/components/roles/create-role/CreateRoleTabs';
import RoleBaseDetails from '@/components/roles/create-role/RoleBaseDetails';
import { RoleEntity } from '@/components/roles/types';
import { singular } from 'pluralize';
import RoleSubmissionHandler, {
  WorkTaskTypeName
} from '@/components/roles/create-role/RoleSubmissionHandler';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';

export default async function CreateRolePage({
  pathVariables
}: LeafComponentProps) {
  const [roleTypeVariable] = getLastNVariables(pathVariables, 2);
  const roleType = singular(roleTypeVariable) as RoleEntity;
  const EntityClassKey = EntityClassMap[`${roleType}RoleType`];
  const roleTypes = await Api[EntityClassKey].getAll();
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
    <div className={'flex h-[100vh] w-[100vw] items-start gap-2 p-4'}>
      <SuitabilityCellManager rowIdList={kdIdList} columnIdList={kLIdList} />
      <RoleSubmissionHandler
        createRoleAction={async (request) => {
          'use server';
          return await postEntitiesWithDifferentReturnType(
            request,
            constructUrl('/api/v2/providerRoles/createFromRolePostRequest')
          );
        }}
        roleEntityType={roleType}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeDomain}
        dtoList={knowledgeDomainDtos}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassKey}
        dtoList={roleTypes}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={WorkTaskTypeName}
        dtoList={workTaskTypeNames}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeLevelSeries}
        dtoList={knowledgeLevelSeriesDtos}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeLevel}
        dtoList={initialKnowledgeLevels}
      />
      <RoleBaseDetails roleEntity={roleType} />
      <CreateRoleTabs
        knowledgeDomains={knowledgeDomainDtos}
        knowledgeLevels={initialKnowledgeLevels}
        roleEntity={roleType}
      />
    </div>
  );
}

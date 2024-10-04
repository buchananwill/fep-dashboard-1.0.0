import { Api } from '@/api/clientApi_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import SuitabilityCellManager from '@/components/roles/suitability/SuitabilityCellManager';
import { getIdList } from '@/functions/getIdList';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { getNames } from '@/components/work-task-types/getNamesServerAction';
import { RoleEntity } from '@/components/roles/types';
import pluralize, { singular } from 'pluralize';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import {
  initialMutationList,
  MutationCounterContextKey,
  WorkTaskTypeName
} from '@/components/roles/create-role/literals';
import FormWrapper from '@/components/roles/create-role/FormWrapper';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

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
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <div className={'m-2 flex h-[90vh] w-[90vw] items-start gap-2'}>
        <SuitabilityCellManager rowIdList={kdIdList} columnIdList={kLIdList} />
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
        <EditAddDeleteDtoControllerArray
          entityClass={MutationCounterContextKey}
          dtoList={initialMutationList}
        />
        <FormWrapper
          roleEntity={roleType}
          knowledgeDomainDtos={knowledgeDomainDtos}
          knowledgeLevels={initialKnowledgeLevels}
          redirectUrl={`/core/${pluralize(roleType)}`}
          createRoleAction={async (request) => {
            'use server';
            return await postEntitiesWithDifferentReturnType(
              request,
              constructUrl(
                `/api/v2/${getRoleTypeSections(roleType)}/createFromRolePostRequest`
              )
            );
          }}
        />
      </div>
    </RootCard>
  );
}

function getRoleTypeSections(roleType: RoleEntity): string {
  switch (roleType) {
    case 'provider':
      return 'providerRoles';
    case 'asset':
      return 'assets/roles';
    case 'user':
      return 'userRoles';
  }
}

/*
 * This is an example of how I structure a page that needs to call surrounding context from the DB.
 * Using these patterns, create an appropriate wrapper for the CreateRoleForm, that prepares these DB entities:
 * - UserRoleType
 * - KnowledgeLevelSeries
 *
 *
 */

import { EntityClassMap } from '@/api/entity-class-map';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { Api } from '@/api/clientApi_';
import RootCard from '@/components/generic/RootCard';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import CreateUserRoleForm from '@/components/user-role/create-user-role/CreateUserRoleForm';
import { UserRoleDto } from '@/api/generated-types/generated-types';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export async function CreateUserRolePage({
  pathVariables
}: LeafComponentProps) {
  const userRoleTypes = await Api.UserRoleType.getAll();
  const knowledgeLevelSeries = await Api.KnowledgeLevelSeries.getAll();

  return (
    <div className={'p-4'}>
      <RootCard
        layoutId={'/' + ['core', ...pathVariables].join('/')}
        displayHeader={'Create ' + getStartCaseDomainAlias('userRole')}
        navigationType={'users'}
      >
        <EditAddDeleteDtoControllerArray
          dtoList={userRoleTypes}
          entityClass={EntityClassMap.userRoleType}
        />
        <EditAddDeleteDtoControllerArray
          dtoList={knowledgeLevelSeries}
          entityClass={EntityClassMap.knowledgeLevelSeries}
        />
        <CreateUserRoleForm
          redirectUrl={'/core/users'}
          createUserRoleAction={Api.UserRole.postOne}
          defaultValues={{
            ...defaultUserRoleValues,
            userRoleType: userRoleTypes[0]
          }}
        />
      </RootCard>
    </div>
  );
}

export const defaultUserRoleValues: UserRoleDto = {
  id: -1,
  name: '',
  startDate: '2024-12-21T21:12:00Z',
  knowledgeLevelSeriesName: '',
  knowledgeLevelSeriesId: NaN,
  partyName: '',
  partyId: -1,
  partyType: 'PERSON',
  partyDateOfBirth: '2010-01-01',
  userRoleType: { id: -1, name: '' }
};

import { Api } from '@/api/clientApi_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import SuitabilityTable, {
  RoleTypes
} from '@/components/roles/suitability/SuitabilityTable';
import {
  isValidAspect,
  RoleApiByTypeIdList,
  RoleAspect,
  RoleCategories,
  RoleEntity,
  RolePageProps
} from '@/components/roles/types';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { startCase } from 'lodash';
import { LinkButton } from '@/components/navigation/LinkButton';
import { notFound } from 'next/navigation';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { singular } from 'pluralize';
import AvailabilityPage from '@/components/roles/availability/availabilityPage';
import { getLastNVariables } from '@/functions/getLastNVariables';
import FinderTableButton from '@/components/tables/FinderTableButton';
import { getCoreEntityLink } from '@/functions/getCoreEntityLink';

export function getRoleEntityKey(roleCategory: 'user' | 'provider' | 'asset') {
  return `${roleCategory}Role` as keyof typeof EntityClassMap;
}

export default async function SuitabilityPage(props: RolePageProps) {
  const {
    params: { roleCategory, roleTypeId }
  } = props;
  // List of all work task types to select
  // List of all provider roles of the layer type
  const roleEntityKey = getRoleEntityKey(roleCategory);
  const suitabilityType = EntityClassMap[roleEntityKey];

  const roleTypeIdInt = parseInt(roleTypeId, 10);
  const roles = await RoleApiByTypeIdList[roleCategory]([roleTypeIdInt]);

  let workTaskTypes = await Api.WorkTaskType.getAll();

  return (
    <div className={'flex gap-4 p-8'}>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workTaskType}
        dtoList={workTaskTypes}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={suitabilityType}
        dtoList={roles}
      />
      <div className={'relative mb-auto mt-auto h-[90vh] w-[90vw]'}>
        <FinderTableButton
          providerRole={roleCategory === 'provider' ? roles : undefined}
          assetRole={roleCategory === 'asset' ? roles : undefined}
          workTaskType={workTaskTypes}
        />
        <SuitabilityTable
          roleTypeId={roleTypeIdInt}
          suitabilityType={suitabilityType as RoleTypes}
        />
      </div>
    </div>
  );
}

export async function RoleTypeListMenu(props: LeafComponentProps) {
  const { pathVariables, depth } = props;
  const roleSingular = singular(pathVariables[0]);
  if (!new Set(Object.keys(RoleCategories)).has(roleSingular)) notFound();
  const roleEntity = roleSingular as RoleEntity;
  const apiKey = `${startCase(roleEntity)}RoleType`;
  const roleTypeApi =
    Api[
      apiKey as keyof Pick<
        typeof Api,
        'UserRoleType' | 'AssetRoleType' | 'ProviderRoleType'
      >
    ];

  const roleTypeList = await roleTypeApi.getAll();
  return (
    <Card>
      <CardHeader>{startCase(pathVariables[0])}</CardHeader>
      <CardBody>
        {roleTypeList.map((roleType) => (
          <LinkButton
            href={getCoreEntityLink(pathVariables.slice(0, depth), [
              roleType.id
            ])}
            key={roleType.id}
          >
            {roleType.name}
          </LinkButton>
        ))}
      </CardBody>
    </Card>
  );
}

function RolePageWrapper({ pathVariables }: LeafComponentProps) {
  const [roleCategory, roleAspect, roleTypeId] = getLastNVariables(
    pathVariables,
    3
  );

  if (!isValidAspect(roleAspect)) notFound();
  const roleAspectValid = roleAspect as RoleAspect;
  const params = {
    roleCategory: singular(roleCategory) as RoleEntity,
    roleAspect: roleAspectValid,
    roleTypeId
  };

  switch (roleAspectValid) {
    case 'suitability': {
      return <SuitabilityPage params={params} />;
    }
    case 'availability':
      return <AvailabilityPage params={params} />;
  }
}

export const RoleTypeListComponent = getPathVariableSplitComponent(
  RoleTypeListMenu,
  RolePageWrapper
);

export const KnowledgeLevelSeriesRoleTypeList = getPathVariableSplitComponent(
  KnowledgeLevelSeriesLinks,
  RoleTypeListComponent
);

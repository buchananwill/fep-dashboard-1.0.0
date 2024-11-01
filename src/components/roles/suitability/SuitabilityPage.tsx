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
import { startCase } from 'lodash';
import { LinkButton } from '@/components/navigation/LinkButton';
import { notFound } from 'next/navigation';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import pluralize, { singular } from 'pluralize';
import AvailabilityPage from '@/components/roles/availability/availabilityPage';
import { getLastNVariables } from '@/functions/getLastNVariables';
import FinderTableButton from '@/components/tables/FinderTableButton';
import { getCoreEntityLink } from '@/functions/getCoreEntityLink';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export function getRoleEntityKey(roleCategory: 'user' | 'provider' | 'asset') {
  return `${roleCategory}Role` as keyof typeof EntityClassMap;
}

export default async function SuitabilityPage(props: RolePageProps) {
  const {
    params: { roleCategory, roleTypeId, roleAspect }
  } = props;
  // List of all work task types to select

  // List of all provider roles of the layer type
  const roleEntityKey = getRoleEntityKey(roleCategory);
  const suitabilityType = EntityClassMap[roleEntityKey];

  const roleTypeIdInt = parseInt(roleTypeId, 10);
  const roles = await RoleApiByTypeIdList[roleCategory]([roleTypeIdInt]);

  let workTaskTypes = await Api.WorkTaskType.getAll();

  return (
    <RootCard layoutId={getRootCardLayoutId([pluralize(roleCategory)])}>
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
    </RootCard>
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
    <div className={'p-4'}>
      <RootCard
        layoutId={getRootCardLayoutId(pathVariables)}
        displayHeader={startCase(pathVariables[0])}
      >
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
      </RootCard>
    </div>
  );
}

function getRoleAspectPage(
  roleAspectValid: 'suitability' | 'availability',
  params: {
    roleTypeId: string;
    roleAspect: 'suitability' | 'availability';
    roleCategory: 'provider' | 'asset' | 'user';
  }
) {
  switch (roleAspectValid) {
    case 'suitability': {
      return <SuitabilityPage params={params} />;
    }
    case 'availability':
      return <AvailabilityPage params={params} />;
  }
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

  const aspectPage = getRoleAspectPage(roleAspectValid, params);

  return <div className={'p-4'}>{aspectPage}</div>;
}

export const RoleTypeListComponent = getPathVariableSplitComponent(
  RoleTypeListMenu,
  RolePageWrapper
);

import { Api } from '@/api/clientApi_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import SuitabilityTable, {
  SuitabilityTypes
} from '@/app/service-categories/[id]/roles/_components/SuitabilityTable';
import TabbedSelectorTables from '@/app/service-categories/[id]/roles/_components/TabbedSelectorTables';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import {
  isValidAspect,
  RoleApiByTypeIdList,
  RoleAspect,
  RoleCategories,
  RoleEntity,
  RolePageProps
} from '@/app/service-categories/[id]/roles/_components/types';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { startCase } from 'lodash';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { getCoreEntityLink } from '@/app/service-categories/ServiceCategoriesHome';
import { notFound } from 'next/navigation';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import { ServiceCategoryLinks } from '@/app/service-categories/[id]/knowledge-domains/ServiceCategoryLinks';
import { singular } from 'pluralize';
import AvailabilityPage from '@/app/service-categories/[id]/roles/_components/availabilityPage';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';

export default async function SuitabilityPage(props: RolePageProps) {
  const {
    params: { roleCategory, roleTypeId, id }
  } = props;
  // List of all work task types to select
  // List of all provider roles of the layer type
  const roleEntityKey = `${roleCategory}Role` as keyof typeof EntityClassMap;
  const roleTypeIdInt = parseInt(roleTypeId, 10);
  const serviceCategoryId = parseInt(id, 10);
  const suitabilityType = EntityClassMap[roleEntityKey];

  const roles = await RoleApiByTypeIdList[roleCategory]([roleTypeIdInt]);

  let workTaskTypes = await Api.WorkTaskType.getDtoListByExampleList([
    { serviceCategoryId }
  ]);

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
      <div className={'fixed left-1/2 top-2'}>
        <Popover shouldCloseOnBlur={false}>
          <PopoverTrigger>
            <Button variant={'light'}>Find</Button>
          </PopoverTrigger>
          <PopoverContent className={'p-4'}>
            <TabbedSelectorTables
              className={'w-[45vw]'}
              workTaskTypes={workTaskTypes}
              providerRoles={roleCategory === 'provider' ? roles : undefined}
              assetRoles={roleCategory === 'asset' ? roles : undefined}
            ></TabbedSelectorTables>
          </PopoverContent>
        </Popover>
      </div>
      <div className={'mb-auto mt-auto h-[90vh] w-[100vw] p-8'}>
        <SuitabilityTable
          roleTypeId={roleTypeIdInt}
          suitabilityType={suitabilityType as SuitabilityTypes}
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
  const [roleCategory, roleAspect, serviceCategoryId, roleTypeId] =
    getLastNVariables(pathVariables, 4);

  if (!isValidAspect(roleAspect)) notFound();
  const roleAspectValid = roleAspect as RoleAspect;
  const params = {
    roleCategory: singular(roleCategory) as RoleEntity,
    roleAspect: roleAspectValid,
    roleTypeId,
    id: serviceCategoryId
  };

  switch (roleAspectValid) {
    case 'suitability': {
      return <SuitabilityPage params={params} />;
    }
    case 'availability':
      return <AvailabilityPage params={params} />;
  }
}

const RoleTypeListComponent = getPathVariableSplitComponent(
  RoleTypeListMenu,
  RolePageWrapper
);

export const ServiceCategoryRoleTypeList = getPathVariableSplitComponent(
  ServiceCategoryLinks,
  RoleTypeListComponent
);

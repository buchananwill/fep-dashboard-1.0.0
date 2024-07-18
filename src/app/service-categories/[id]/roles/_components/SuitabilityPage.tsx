import { Api } from '@/api/clientApi';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import SuitabilityTable, {
  SuitabilityTypes
} from '@/app/service-categories/[id]/roles/_components/SuitabilityTable';
import TabbedSelectorTables from '@/app/service-categories/[id]/roles/_components/TabbedSelectorTables';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import {
  RoleApiByTypeIdList,
  RolePageProps
} from '@/app/service-categories/[id]/roles/_components/types';

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
        <Popover>
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

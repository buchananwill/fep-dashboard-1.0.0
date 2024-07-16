import { Api } from '@/api/clientApi';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import SuitabilityTable from '@/app/service-categories/[id]/roles/_components/SuitabilityTable';
import TabbedSelectorTables from '@/app/service-categories/[id]/roles/_components/TabbedSelectorTables';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';

export default async function page({
  params: { roleTypeId, id }
}: {
  params: { id: string; roleTypeId: string };
}) {
  // List of all work task types to select
  // List of all provider roles of the layer type
  const providerRoleTypeId = parseInt(roleTypeId, 10);
  const serviceCategoryId = parseInt(id, 10);

  const roles = await Api.ProviderRole.getByTypeIdList([providerRoleTypeId]);

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
        entityClass={EntityClassMap.providerRole}
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
              providerRoles={roles}
            ></TabbedSelectorTables>
          </PopoverContent>
        </Popover>
      </div>
      <div className={'mb-auto mt-auto h-[90vh] w-[100vw] p-8'}>
        <SuitabilityTable
          roleTypeId={providerRoleTypeId}
          suitabilityType={'ProviderRole'}
        />
      </div>
    </div>
  );
}

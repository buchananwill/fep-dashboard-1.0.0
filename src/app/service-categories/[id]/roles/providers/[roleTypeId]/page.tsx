import { ProviderRoleApi, WorkTaskTypeApi } from '@/api/clientApi';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import FilterSelectContextTable from '@/app/service-categories/[id]/work-task-types/_components/FilterSelectContextTable';
import SuitabilityTableWindowed from '@/app/service-categories/[id]/roles/providers/_components/SuitabilityTableWindowed';
import { Tab, Tabs } from '@nextui-org/tabs';
import TabbedSelectorTables from '@/app/service-categories/[id]/roles/providers/_components/TabbedSelectorTables';

export default async function page({
  params: { roleTypeId, id }
}: {
  params: { id: string; roleTypeId: string };
}) {
  // List of all work task types to select
  // List of all provider roles of the layer type
  const providerRoleTypeId = parseInt(roleTypeId, 10);
  const serviceCategoryId = parseInt(id, 10);

  const roles = await ProviderRoleApi.getByTypeIdList([providerRoleTypeId]);
  const partyIdList = roles.map((role) => role.partyId);

  let workTaskTypes = await WorkTaskTypeApi.getDtoListByExampleList([
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
      <div className={'mb-auto mt-auto h-[75vh] w-[50vw]'}>
        <SuitabilityTableWindowed
          partyIdList={partyIdList}
          providerRoleTypeId={providerRoleTypeId}
        />
      </div>
      <TabbedSelectorTables
        className={'w-[45vw] p-4'}
        workTaskTypes={workTaskTypes}
        providerRoles={roles}
      ></TabbedSelectorTables>
    </div>
  );
}

import { Api } from '@/api/clientApi';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import FilterSelectEntityTable from '@/components/generic/FilterSelectEntityTable';
import SuitabilityTableWindowed from '@/app/service-categories/[id]/roles/_components/SuitabilityTableWindowed';
import { Tab, Tabs } from '@nextui-org/tabs';
import TabbedSelectorTables from '@/app/service-categories/[id]/roles/_components/TabbedSelectorTables';

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
      <div className={'mb-auto mt-auto h-[75vh] w-[50vw]'}>
        <SuitabilityTableWindowed
          roleTypeId={providerRoleTypeId}
          suitabilityType={'ProviderRole'}
        />
      </div>
      <TabbedSelectorTables
        className={'w-[45vw]'}
        workTaskTypes={workTaskTypes}
        providerRoles={roles}
      ></TabbedSelectorTables>
    </div>
  );
}

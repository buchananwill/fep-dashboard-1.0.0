import {
  ProviderRoleApi,
  ProviderRoleSuitabilityApi,
  WorkTaskTypeApi
} from '@/api/clientApi';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { ConditionalNumberClassName } from '@/components/generic/DtoStoreNumberInput';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import NumberEditCellList from '@/app/service-categories/[id]/roles/_components/NumberEditCellList';
import clsx from 'clsx';
import WorkTaskTypeSelector from '@/app/service-categories/[id]/work-task-types/_components/WorkTaskTypeSelector';
import { EmptyArray } from '@/api/literals';
import SuitabilityTable from '@/app/service-categories/[id]/roles/providers/_components/SuitabilityTable';
import WorkTaskTypeTable from '@/app/service-categories/[id]/work-task-types/_components/WorkTaskTypeTable';
import Drawer from '@/components/layout/Drawer';

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
    <>
      <Drawer
        buttonLabel={'Show Table'}
        className={'fixed right-0  w-fit overflow-x-hidden  rounded-lg p-2'}
        whenClosed={'translate-x-[40rem] overflow-y-hidden'}
        whenOpen={'overflow-y-auto'}
        innerDivProps={{
          className:
            'transition-transform duration-1000 bg-white max-h-[85vh] border-2 rounded-xl p-4'
        }}
      >
        <WorkTaskTypeTable workTaskTypes={workTaskTypes} />
      </Drawer>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workTaskType}
        dtoList={workTaskTypes}
      />

      <SuitabilityTable
        partyIdList={partyIdList}
        providerRoleTypeId={providerRoleTypeId}
      />
    </>
  );
}

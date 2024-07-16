import { Api } from '@/api/clientApi';
import { AvailabilityTable } from '@/app/service-categories/[id]/roles/[roleTypeId]/providers/availability/AvailabilityTable';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { GenericTableDto } from '@/api/types';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import { ProviderRoleAvailabilityDto } from '@/api/dtos/ProviderRoleAvailabilityDtoSchema';

export default async function page() {
  const providerRoles = await Api.ProviderRole.getDtoListByExampleList([
    { type: { id: 1 } }
  ]);

  const providerIdList = providerRoles.map((role) => role.id);

  // const intersectionTableDto =
  //   await Api.ProviderRoleAvailability.getByRowIdList(providerIdList);

  const genericTable = await postEntitiesWithDifferentReturnType<
    number[],
    GenericTableDto<
      ProviderRoleDto,
      CycleSubspanDto,
      ProviderRoleAvailabilityDto
    >
  >(
    providerIdList,
    constructUrl(
      '/api/v2/providerRoles/availabilities/dtoTableByRowListAndColumnList'
    )
  );

  const cycleSubspanList = await Api.CycleSubspan.getDtoListByExampleList([
    { parentCycleId: 1 }
  ]);

  const cycleSubspanIdList = cycleSubspanList.map(
    (cycleSubspan) => cycleSubspan.id
  );

  const itemData = providerIdList.map((providerId) => {
    return cycleSubspanIdList.map((cycleSubspanId) => ({
      rowId: providerId,
      columnId: cycleSubspanId
    }));
  });

  return (
    <div className={'ml-auto mr-auto h-[100vh] w-[100vw] p-8'}>
      <AvailabilityTable
        tableData={genericTable}
        itemData={itemData}
        columnIdList={cycleSubspanIdList}
        rowIdList={providerIdList}
      />
    </div>
  );
}

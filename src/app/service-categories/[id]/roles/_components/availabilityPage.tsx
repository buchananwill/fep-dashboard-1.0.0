import { Api } from '@/api/clientApi';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { GenericTableDto } from '@/api/types';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import { ProviderRoleAvailabilityDto } from '@/api/dtos/ProviderRoleAvailabilityDtoSchema';
import { AvailabilityTable } from './AvailabilityTable';
import { RolePageProps } from '@/app/service-categories/[id]/roles/_components/types';

export default async function AvailabilityPage({
  params: { roleTypeId }
}: RolePageProps) {
  const providerRoles = await Api.ProviderRole.getDtoListByExampleList([
    { type: { id: parseInt(roleTypeId) } }
  ]);

  const providerIdList = providerRoles.map((role) => role.id);

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

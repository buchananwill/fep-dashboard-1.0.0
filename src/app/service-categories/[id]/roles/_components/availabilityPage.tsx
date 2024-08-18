import { Api } from '@/api/clientApi_';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { GenericTableDto } from '@/api/types';
import { ProviderRoleDto } from '@/api/zod-schemas/ProviderRoleDtoSchema';
import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';
import { ProviderRoleAvailabilityDto } from '@/api/zod-schemas/ProviderRoleAvailabilityDtoSchema';
import { AvailabilityTable } from './AvailabilityTable';
import { RolePageProps } from '@/app/service-categories/[id]/roles/_components/types';
import { getIdList } from '@/app/service-categories/[id]/roles/_components/getIdList';
import { getTableProps } from '@/app/service-categories/[id]/roles/_components/useTableProps';

export default async function AvailabilityPage({
  params: { roleTypeId }
}: RolePageProps) {
  const providerRoles = await Api.ProviderRole.getDtoListByExampleList([
    { type: { id: parseInt(roleTypeId) } }
  ]);
  const cycleSubspanList = await Api.CycleSubspan.getDtoListByExampleList([
    { parentCycleId: 1 }
  ]);
  const providerIdList: number[] = getIdList(providerRoles);

  const genericTable = await postEntitiesWithDifferentReturnType<
    number[],
    GenericTableDto<
      ProviderRoleDto,
      CycleSubspanDto,
      ProviderRoleAvailabilityDto,
      ProviderRoleAvailabilityDto
    >
  >(
    providerIdList,
    constructUrl(
      '/api/v2/providerRoles/availabilities/dtoTableByRowListAndColumnList'
    )
  );

  const tableProps = getTableProps(providerRoles, cycleSubspanList);

  return (
    <div className={'ml-auto mr-auto h-[100vh] w-[100vw] p-8'}>
      <AvailabilityTable tableData={genericTable} {...tableProps} />
    </div>
  );
}

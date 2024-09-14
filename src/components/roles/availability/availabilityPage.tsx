import { Api } from '@/api/clientApi_';
import { AvailabilityTable } from './AvailabilityTable';
import { RoleApiByTypeIdList, RolePageProps } from '@/components/roles/types';
import { getIdList } from '@/functions/getIdList';
import { getTableProps } from '@/components/tables/useTableProps';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getRoleEntityKey } from '@/components/roles/suitability/SuitabilityPage';
import { availabilityConfig } from '@/components/roles/availability/AvailabilityConfig';
import {
  AvailabilityEntityClass,
  AvailabilityType
} from '@/components/roles/availability/AvailabilityType';
import { notFound } from 'next/navigation';

export default async function AvailabilityPage({
  params: { roleTypeId, roleCategory }
}: RolePageProps) {
  if (roleCategory === 'user') {
    return notFound();
  }
  const roleEntityKey = getRoleEntityKey(roleCategory);
  const entityClassMapElement = EntityClassMap[roleEntityKey];
  const roleTypeIdInt = parseInt(roleTypeId, 10);
  const roles = await RoleApiByTypeIdList[roleCategory]([roleTypeIdInt]);

  const cycleSubspanList = await Api.CycleSubspan.getDtoListByExampleList([
    { parentCycleId: 1 }
  ]);
  const roleIdList: number[] = getIdList(roles);
  console.log(roleIdList);

  const genericTable =
    await Api[
      availabilityConfig[roleCategory as AvailabilityType]
        .entityClass as keyof Pick<typeof Api, AvailabilityEntityClass>
    ].getDtoTableByRowIdList(roleIdList);

  const tableProps = getTableProps(roles, cycleSubspanList);

  return (
    <div className={'ml-auto mr-auto h-[100vh] w-[100vw] p-8'}>
      <EditAddDeleteDtoControllerArray
        entityClass={entityClassMapElement}
        dtoList={genericTable.rowList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={cycleSubspanList}
      />
      {/* TODO: fix typing on this component. */}
      <AvailabilityTable
        type={roleCategory}
        tableData={genericTable}
        {...tableProps}
      />
    </div>
  );
}

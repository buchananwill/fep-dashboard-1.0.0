import { Api } from '@/api/clientApi_';
import { AvailabilityTable } from './AvailabilityTable';
import {
  RoleApiByTypeIdList,
  RolePageProps
} from '@/app/service-categories/[id]/roles/_components/types';
import { getIdList } from '@/app/service-categories/[id]/roles/_components/getIdList';
import { getTableProps } from '@/app/service-categories/[id]/roles/_components/useTableProps';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getRoleEntityKey } from '@/app/service-categories/[id]/roles/_components/SuitabilityPage';
import { availabilityConfig } from '@/app/service-categories/[id]/roles/_components/AvailabilityConfig';
import {
  AvailabilityEntityClass,
  AvailabilityType
} from '@/app/service-categories/[id]/roles/_components/AvailabilityType';
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
    ].getDtoTableByRowIdListAndColumnIdList(roleIdList);

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
      <AvailabilityTable
        type={roleCategory}
        tableData={genericTable}
        {...tableProps}
      />
    </div>
  );
}

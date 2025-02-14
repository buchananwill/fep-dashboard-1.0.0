import { Api } from '@/api/clientApi_';
import { AvailabilityTable } from './AvailabilityTable';
import { RoleApiByTypeIdList, RolePageProps } from '@/components/roles/types';
import { getIdList } from '@/functions/getIdList';
import { getTableProps } from '@/components/grids/useTableProps';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getRoleEntityKey } from '@/components/roles/suitability/SuitabilityPage';
import { availabilityConfig } from '@/components/roles/availability/AvailabilityConfig';
import {
  AvailabilityEntityClass,
  AvailabilityType
} from '@/components/roles/availability/AvailabilityType';
import { notFound } from 'next/navigation';
import { GenericTableDto, HasNumberId } from '@/api/types';
import { CycleSubspanDto } from '@/api/generated-types/generated-types_';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import pluralize from 'pluralize';

export default async function AvailabilityPage<
  Role extends HasNumberId,
  Availability
>({ params: { roleTypeId, roleCategory } }: RolePageProps) {
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
  const entityClassForApi = availabilityConfig[roleCategory as AvailabilityType]
    .entityClass as keyof Pick<typeof Api, AvailabilityEntityClass>;
  const apiElement = Api[entityClassForApi];
  const genericTable = await apiElement.getDtoTableByRowIdList(roleIdList);

  const tableProps = getTableProps(roles, cycleSubspanList);

  return (
    <RootCard layoutId={getRootCardLayoutId([pluralize(roleCategory)])}>
      <div className={'h-[90vh] w-[90vw]'}>
        <EditAddDeleteDtoControllerArray
          entityClass={entityClassMapElement}
          dtoList={genericTable.rowList}
        />
        <EditAddDeleteDtoControllerArray
          entityClass={EntityClassMap.cycleSubspan}
          dtoList={cycleSubspanList}
        />
        <AvailabilityTable<Role, Availability>
          type={roleCategory}
          tableData={
            genericTable as GenericTableDto<
              Role,
              CycleSubspanDto,
              Availability,
              Availability
            >
          }
          {...tableProps}
        />
      </div>
    </RootCard>
  );
}

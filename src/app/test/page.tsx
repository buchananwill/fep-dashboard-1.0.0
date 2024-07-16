import { Api } from '@/api/clientApi';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { GenericTableDto, HasId } from '@/api/types';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import { ProviderRoleAvailabilityDto } from '@/api/dtos/ProviderRoleAvailabilityDtoSchema';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { StringPropertyKey } from '@/types';
import FepDataGrid from './FepDataGrid';
import { Column } from 'react-data-grid';

export default async function page() {
  const providerRoles = await Api.ProviderRole.getDtoListByExampleList([
    { type: { id: 1 } }
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

  type Row = {
    id: string;
  } & { [key: string]: number | undefined };

  const cycleSubspanList = await Api.CycleSubspan.getDtoListByExampleList([
    { parentCycleId: 1 }
  ]);

  const cycleSubspanIdList = cycleSubspanList.map(
    (cycleSubspan) => cycleSubspan.id
  );

  const columns = [
    nameColumn,
    ...mapColumnEntitiesToColumns(cycleSubspanList, 'name')
  ];

  const rows = providerIdList.map((providerId) => {
    const row: Row = {
      id: String(providerId),
      name: providerRoles.find((provider) => provider.id === providerId)
        ?.partyName
    };
    cycleSubspanIdList.forEach((csId) => {
      const columnMapOrUndefined =
        genericTable.rowColumnCellReferenceMap[row.id];
      const availIdOrUndefined = columnMapOrUndefined
        ? columnMapOrUndefined[String(csId)]
        : undefined;
      const availCode = availIdOrUndefined
        ? genericTable.cellIdCellContentMap[availIdOrUndefined].availabilityCode
        : undefined;
      row[String(csId)] = availCode;
    });
    return row;
  });

  const itemData = providerIdList.map((providerId) => {
    return cycleSubspanIdList.map((cycleSubspanId) => ({
      rowId: providerId,
      columnId: cycleSubspanId
    }));
  });
  return <FepDataGrid columns={columns} rows={rows} />;
}

function mapColumnEntitiesToColumns<T extends HasId>(
  entities: T[],
  labelKey: StringPropertyKey<T>
): Column<any>[] {
  return entities.map((entity) => ({
    key: String(entity.id),
    name: entity[labelKey] as string, // Replace with your dynamic label logic
    resizable: false,
    width: 40,
    minWidth: 40
  }));
}

const nameColumn = {
  key: 'name',
  name: 'Name', // Replace with your dynamic label logic
  resizable: false,
  width: 100
};

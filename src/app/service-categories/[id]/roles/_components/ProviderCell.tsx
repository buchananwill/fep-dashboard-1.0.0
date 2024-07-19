import { BaseDtoUiProps } from 'dto-stores';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/CellQueryManager';
import { EntityClassMap } from '@/api/entity-class-map';
import DtoUiWrapperCell from '@/app/service-categories/[id]/roles/_components/DtoUiWrapperCell';

function InnerProviderCell(props: BaseDtoUiProps<ProviderRoleDto>) {
  return (
    <span className={'center-vertical-with-margin inline-block truncate pl-1'}>
      {props.entity.partyName}
    </span>
  );
}

export function ProviderCell(
  props: GridChildComponentProps<CellIdReference[][]>
) {
  return (
    <DtoUiWrapperCell
      {...props}
      InnerCell={InnerProviderCell}
      idKey={'rowId'}
      entityClass={EntityClassMap.providerRole}
    />
  );
}

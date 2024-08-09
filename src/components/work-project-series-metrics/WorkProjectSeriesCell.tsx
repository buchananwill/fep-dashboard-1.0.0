import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import DtoUiWrapperCell from '@/app/service-categories/[id]/roles/_components/DtoUiWrapperCell';
import { EntityClassMap } from '@/api/entity-class-map';
import { BaseLazyDtoUiProps } from 'dto-stores';
import { WorkProjectSeriesWithSchemaLabelsDto } from '@/api/generated-types/generated-types_';
import { getValue } from '@/functions/allowingNestedFiltering';

export default function WorkProjectSeriesCell(props: CellWrapperProps) {
  return (
    <DtoUiWrapperCell
      {...props}
      InnerCell={InnerWorkProjectSeriesCell}
      entityClass={EntityClassMap.workProjectSeries}
      idKey={'rowId'}
    />
  );
}

export function InnerWorkProjectSeriesCell({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesWithSchemaLabelsDto>) {
  return (
    <span className={'inline-block w-full truncate'}>
      {getValue(entity, 'workProjectSeriesSchema.workTaskType.name')}
    </span>
  );
}

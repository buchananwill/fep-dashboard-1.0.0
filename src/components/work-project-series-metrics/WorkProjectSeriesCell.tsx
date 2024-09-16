import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import DtoUiWrapperCell from '@/components/grids/DtoUiWrapperCell';
import { EntityClassMap } from '@/api/entity-class-map';
import { BaseLazyDtoUiProps } from 'dto-stores';
import {
  WorkProjectSeriesDto,
  WorkProjectSeriesWithSchemaLabelsDto
} from '@/api/generated-types/generated-types';
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
}: Partial<BaseLazyDtoUiProps<WorkProjectSeriesDto>>) {
  return (
    <span className={'center-all-margin inline-block w-full truncate pl-0.5'}>
      {getValue(entity, 'workTaskType.knowledgeDomain.shortCode') ??
        getValue(entity, 'workTaskType.knowledgeDomain.name')}
      :{getValue(entity, 'workTaskType.knowledgeLevel.levelOrdinal')}
    </span>
  );
}

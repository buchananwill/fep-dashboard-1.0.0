import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import DtoUiWrapperCell from '@/components/grids/DtoUiWrapperCell';
import { EntityClassMap } from '@/api/entity-class-map';
import { BaseLazyDtoUiProps } from 'dto-stores';
import {
  WorkProjectDto,
  WorkProjectWithSchemaLabelsDto
} from '@/api/generated-types/generated-types_';
import { getValue } from '@/functions/allowingNestedFiltering';

export default function WorkProjectCell(props: CellWrapperProps) {
  return (
    <DtoUiWrapperCell
      {...props}
      InnerCell={InnerWorkProjectCell}
      entityClass={EntityClassMap.workProject}
      idKey={'rowId'}
    />
  );
}

export function InnerWorkProjectCell({
  entity
}: Partial<BaseLazyDtoUiProps<WorkProjectDto>>) {
  return (
    <span className={'center-all-margin inline-block w-full truncate pl-0.5'}>
      {getValue(entity, 'workType.knowledgeDomain.shortCode') ??
        getValue(entity, 'workType.knowledgeDomain.name')}
      :{getValue(entity, 'workType.knowledgeLevel.levelOrdinal')}
    </span>
  );
}

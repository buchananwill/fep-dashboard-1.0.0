import { BaseDtoUiProps } from 'dto-stores';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import DtoUiWrapperCell from '@/app/service-categories/[id]/roles/_components/DtoUiWrapperCell';
import { EntityClassMap } from '@/api/entity-class-map';
import { memo } from 'react';

function InnerWorkProjectSeriesSchemaCell({
  entity
}: BaseDtoUiProps<WorkProjectSeriesSchemaDto>) {
  return (
    <span className={'center-vertical-with-margin inline-block truncate pl-1'}>
      {entity.name}
    </span>
  );
}

export default function WorkProjectSeriesSchemaCell(props: CellWrapperProps) {
  return (
    <DtoUiWrapperCell
      {...props}
      InnerCell={InnerWorkProjectSeriesSchemaCell}
      entityClass={EntityClassMap.workProjectSeriesSchema}
      idKey={'rowId'}
    />
  );
}

export const MemoWorkProjectSeriesSchemaCell = memo(
  WorkProjectSeriesSchemaCell
);

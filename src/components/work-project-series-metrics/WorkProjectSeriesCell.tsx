import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import DtoUiWrapperCell from '@/app/service-categories/[id]/roles/_components/DtoUiWrapperCell';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  NamedEntityLabel,
  WorkProjectSeriesSchemaCode
} from '@/app/scheduling/feasibility-report/_components/WorkProjectSeriesSchemaLabel';
import { BaseDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { WorkProjectSeriesDto } from '@/api/generated-types/generated-types_';
import { Loading } from '@/app/scheduling/feasibility-report/_components/AssignmentFeasibilityTreeItem';

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

function InnerWorkProjectSeriesCell({
  entity
}: BaseDtoUiProps<WorkProjectSeriesDto>) {
  return (
    <LazyDtoUiWrapper
      renderAs={WorkProjectSeriesSchemaCode}
      entityId={entity.workProjectSeriesSchemaId}
      entityClass={EntityClassMap.workProjectSeriesSchema}
      whileLoading={Loading}
    />
  );
}

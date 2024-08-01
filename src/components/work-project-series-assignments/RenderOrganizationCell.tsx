import { LazyDtoUiWrapper } from 'dto-stores';
import { NamedEntityLabel } from '@/components/feasibility-report/WorkProjectSeriesSchemaLabel';
import { EntityClassMap } from '@/api/entity-class-map';
import { Loading } from '@/components/feasibility-report/AssignmentFeasibilityTreeItem';
import { CellWrapperProps } from '@/components/tables/getCellIdReference';

export default function RenderOrganizationCell({
  rowIndex,
  columnIndex,
  data,
  style
}: CellWrapperProps) {
  return (
    <div style={style}>
      <div className={'truncate'}>
        <span className={'inline-block p-2'}>
          <LazyDtoUiWrapper
            renderAs={NamedEntityLabel}
            entityId={data[rowIndex][columnIndex].rowId}
            entityClass={EntityClassMap.organization}
            whileLoading={Loading}
          />
        </span>
      </div>
    </div>
  );
}

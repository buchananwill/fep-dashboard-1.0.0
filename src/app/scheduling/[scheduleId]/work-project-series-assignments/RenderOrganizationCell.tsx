import { GridChildComponentProps } from 'react-window';
import { LazyDtoUiWrapper } from 'dto-stores';
import { NamedEntityLabel } from '@/app/scheduling/feasibility-report/_components/WorkProjectSeriesSchemaLabel';
import { EntityClassMap } from '@/api/entity-class-map';
import { Loading } from '@/app/scheduling/feasibility-report/_components/AssignmentFeasibilityTreeItem';
import { CellIdReference } from '@/components/tables/CellQueryManager';
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

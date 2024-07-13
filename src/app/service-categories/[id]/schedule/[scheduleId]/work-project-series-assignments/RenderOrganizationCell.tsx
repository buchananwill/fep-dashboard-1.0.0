import { GridChildComponentProps } from 'react-window';
import { LazyDtoUiWrapper } from 'dto-stores';
import { NamedEntityLabel } from '@/app/feasibility-report/_components/WorkProjectSeriesSchemaLabel';
import { EntityClassMap } from '@/api/entity-class-map';
import { Loading } from '@/app/feasibility-report/_components/AssignmentFeasibilityTreeItem';
import { AssignmentCell } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CycleSubspanQueryManager';

export default function RenderOrganizationCell({
  rowIndex,
  columnIndex,
  data,
  style
}: GridChildComponentProps<AssignmentCell[][]>) {
  return (
    <div style={style}>
      <div className={'truncate'}>
        <span className={'inline-block p-2'}>
          <LazyDtoUiWrapper
            renderAs={NamedEntityLabel}
            entityId={data[rowIndex][columnIndex].organizationId}
            entityClass={EntityClassMap.organization}
            whileLoading={Loading}
          />
        </span>
      </div>
    </div>
  );
}

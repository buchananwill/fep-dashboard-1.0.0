import {
  CellWrapperProps,
  getCellIdReference
} from '@/components/tables/getCellIdReference';
import { DtoUiWrapper, useDtoStore } from 'dto-stores';
import { AssignmentTableRowClassName } from '@/app/scheduling/[scheduleId]/work-project-series-assignments/AssignmentTable';
import { AssignmentTableRow } from '@/api/types';
import { NamedEntityLabel } from '@/app/scheduling/feasibility-report/_components/WorkProjectSeriesSchemaLabel';
import { EntityClassMap } from '@/api/entity-class-map';
import { useMemo } from 'react';

export default function AssignmentRowCell({
  columnIndex,
  rowIndex,
  data,
  style,
  isScrolling
}: CellWrapperProps) {
  const cellIdReference = getCellIdReference({ data, rowIndex, columnIndex });
  const { entity } = useDtoStore<AssignmentTableRow>({
    entityId: cellIdReference.rowId,
    entityClass: AssignmentTableRowClassName,
    listenerKey: `headerColumnCell:${rowIndex}`
  });

  const InnerCell = useMemo(() => {
    switch (entity.entityClass) {
      case 'Organization':
        return (
          <DtoUiWrapper
            entityClass={EntityClassMap.organization}
            entityId={entity.data.id}
            renderAs={NamedEntityLabel}
          />
        );
      case 'WorkProjectSeriesAssignment':
        return (
          <DtoUiWrapper
            entityClass={EntityClassMap.organization}
            entityId={entity.data.organizationId}
            renderAs={NamedEntityLabel}
          />
        );
    }
  }, [entity]);

  return (
    <div style={style}>
      <div className={'truncate'}>
        <span className={'inline-block p-2'}>{InnerCell}</span>
      </div>
    </div>
  );
}

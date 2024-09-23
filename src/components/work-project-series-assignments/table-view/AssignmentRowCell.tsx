'use client';
import {
  CellWrapperProps,
  getCellIdReference
} from '@/components/grids/getCellIdReference';
import { DtoUiWrapper, useDtoStore } from 'dto-stores';
import { AssignmentTableRowClassName } from '@/components/work-project-series-assignments/table-view/AssignmentTable';
import { AssignmentTableRow } from '@/api/types';
import { NamedEntityLabel } from '@/components/feasibility-report/WorkProjectSeriesSchemaLabel';
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
    entityId: cellIdReference.rowId ?? NaN,
    entityClass: AssignmentTableRowClassName,
    listenerKey: `headerColumnCell:${rowIndex}`
  });

  const InnerCell = useMemo(() => {
    if (entity === undefined) return null;
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

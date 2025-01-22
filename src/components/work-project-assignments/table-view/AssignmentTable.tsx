'use client';
import VirtualizedTableWindowed from '@/components/grids/VirtualizedTableWindowed';
import React from 'react';
import CellQueryManager from '@/components/grids/CellQueryManager';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useGlobalController } from 'selective-context';
import { EmptyArray } from '@/api/client-literals';
import AssignmentCell from '@/components/work-project-assignments/table-view/AssignmentCell';
import { workProjectDataRetrieval } from '@/components/work-project-assignments/table-view/workProjectDataRetrieval';
import { NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { useFilteredRows } from '@/components/work-schema/static-allocation/useFilteredRows';
import { AssignmentTableRow, GenericTableDto } from '@/api/types';
import {
  CycleSubspanDto,
  OrganizationDto,
  WorkProjectDto,
  WorkSchemaDto
} from '@/api/generated-types/generated-types_';
import FinderTableButton from '@/components/tables/FinderTableButton';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import AssignmentRowCell from '@/components/work-project-assignments/table-view/AssignmentRowCell';
import CycleSubspanCell from '@/components/grids/CycleSubspanCell';

export const selectedAssignmentCell = 'selectedAssignmentCell';
export const AssignmentTableRowClassName = 'AssignmentTableRow';
export default function AssignmentTable({
  tableData,
  organizations
}: {
  tableData: GenericTableDto<
    AssignmentTableRow,
    CycleSubspanDto,
    WorkProjectDto,
    number
  >;
  organizations: OrganizationDto[];
}) {
  const { currentState: workSchemas } = NamespacedHooks.useListen(
    EntityClassMap.workSchema,
    KEY_TYPES.MASTER_LIST,
    'AssignmentTable',
    EmptyArray as WorkSchemaDto[]
  );

  const listenerKey = useUuidListenerKey();
  useGlobalController<number[]>({
    contextKey: selectedAssignmentCell,
    initialValue: EmptyArray,
    listenerKey
  });

  const tableProps = useFilteredRows(
    tableData,
    EntityClassMap.organization,
    filterFunctionCreator
  );

  return (
    <>
      <FinderTableButton
        organization={organizations}
        // workSchemas={workSchemas}
      />
      <CellQueryManager
        tableData={tableData}
        getDataRetrievalMemoizedFunction={workProjectDataRetrieval}
      />

      <VirtualizedTableWindowed
        {...tableProps}
        renderCell={memoCell}
        renderSyncedRowCell={CycleSubspanCell}
        renderSyncedColumnCell={memoOrganizationCell}
      />
    </>
  );
}

const memoCell = React.memo(AssignmentCell);
const memoOrganizationCell = React.memo(AssignmentRowCell);

function filterFunctionCreator(idSet: Set<number | string>) {
  return (entity: AssignmentTableRow) => {
    if (entity.entityClass === 'Organization') return idSet.has(entity.data.id);
    else if (entity.entityClass === 'WorkProjectAssignment')
      return idSet.has(entity.data.organizationId);
    else return false;
  };
}

'use client';

import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { FeasibilityReportFullDto } from '@/api/dtos/FeasibilityReportFullDtoSchema';
import { HasId } from '@/api/types';
import { BaseDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { PropsWithChildren } from 'react';
import { getEntityNamespaceKeyWithDto } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceKeyWithDto';
import { Chip } from '@nextui-org/chip';
import WorkTaskTypeSummary from '@/app/service-categories/[id]/work-task-types/_components/WorkTaskTypeSummary';
import { EntityClassMap } from '@/api/entity-class-map';
import { Spinner } from '@nextui-org/spinner';

const taskTypeClassification = 'taskTypeClassification';
const taskTypeClassificationItem = 'taskTypeClassificationItem';
const cycleFeasibility = 'nodeCycleFeasibility';
const assignmentFeasibility = 'nodeAssignmentFeasibility';
export default function TreeViewWrapper({
  report
}: {
  report: FeasibilityReportFullDto;
}) {
  return (
    <SimpleTreeView>
      <TreeItem
        itemId={taskTypeClassification}
        label={`${taskTypeClassification} list`}
      >
        {report.taskTypeClassifications
          .filter((ttc) => ttc.classificationType === 'WORK_TASK_TYPE_TO_PARTY')
          .map((ttClass) => (
            <EntityTreeItem
              entityClass={taskTypeClassification}
              entity={ttClass}
              key={getEntityNamespaceKeyWithDto(
                taskTypeClassification,
                ttClass
              )}
            >
              {ttClass.cycleSubspanTotal}
              {ttClass.taskTypeClassificationItems.map((ttcItem) => (
                <LazyDtoUiWrapper
                  key={getEntityNamespaceKeyWithDto(
                    taskTypeClassificationItem,
                    ttcItem
                  )}
                  renderAs={WorkTaskTypeSummary}
                  entityId={ttcItem.workTaskTypeId}
                  entityClass={EntityClassMap.workTaskType}
                  whileLoading={() => <Spinner />}
                />
              ))}
            </EntityTreeItem>
          ))}
      </TreeItem>
      <TreeItem
        itemId={cycleFeasibility}
        label={'WorkSchemaNode Feasibilities'}
      >
        {report.nodeCycleFeasibilities.map((nodeCycleFeasibility) => (
          <EntityTreeItem
            entityClass={cycleFeasibility}
            entity={nodeCycleFeasibility}
            key={getEntityNamespaceKeyWithDto(
              cycleFeasibility,
              nodeCycleFeasibility
            )}
          >
            {nodeCycleFeasibility.cycleSubspansRequirement}
          </EntityTreeItem>
        ))}
      </TreeItem>
      <TreeItem
        itemId={assignmentFeasibility}
        label={'Assignment Feasibility List'}
      >
        {report.nodeAssignmentFeasibilities.map((nodeAssignmentFeasibility) => (
          <EntityTreeItem
            entityClass={assignmentFeasibility}
            entity={nodeAssignmentFeasibility}
            key={getEntityNamespaceKeyWithDto(
              assignmentFeasibility,
              nodeAssignmentFeasibility
            )}
          >
            {nodeAssignmentFeasibility.cycleSubspanRequirement}
          </EntityTreeItem>
        ))}
      </TreeItem>
    </SimpleTreeView>
  );
}

function EntityTreeItem<T extends HasId>({
  entity,
  entityClass,
  children,
  label
}: Pick<BaseDtoUiProps<T>, 'entity' | 'entityClass'> &
  PropsWithChildren & { label?: string }) {
  return (
    <TreeItem
      itemId={`${entityClass}:${entity.id}`}
      label={label ?? `${entityClass} ${entity.id}`}
    >
      {children}
    </TreeItem>
  );
}

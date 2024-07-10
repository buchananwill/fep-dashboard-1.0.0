'use client';

import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { FeasibilityReportFullDto } from '@/api/dtos/FeasibilityReportFullDtoSchema';
import { HasId } from '@/api/types';
import { BaseDtoUiProps } from 'dto-stores';
import { PropsWithChildren } from 'react';
import { getEntityNamespaceKeyWithDto } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceKeyWithDto';
import { CustomTreeItem } from '@/components/CustomTreeItem';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import FeasibilityReportTreeItem from '@/app/feasibility-report/_components/FeasilbilityReportTreeItem';
import { getCommonTreeItemProps } from '@/app/feasibility-report/_components/getCommonTreeItemProps';

export const taskTypeClassification = 'TaskTypeClassification';
export const taskTypeClassificationItem = 'taskTypeClassificationItem';
export const cycleFeasibility = 'nodeCycleFeasibility';
export const assignmentFeasibility = 'nodeAssignmentFeasibility';
export const taskTypeClassificationFeasibilities =
  'taskTypeClassificationFeasibilities';

export function getLabelIcon({ passes }: { passes: boolean }) {
  return passes
    ? CheckCircleOutline
    : // () => <CheckCircleIcon className={'h-6 w-6'} />
      HighlightOff;
}

const classificationFeasibility = 'taskTypeClassificationFeasibility';
export default function FeasibilityReport({
  report
}: {
  report: FeasibilityReportFullDto;
}) {
  const { itemId, labelIcon, ...colors } = getCommonTreeItemProps({
    itemType: 'feasibilityFullReport',
    payload: report
  });
  return (
    <SimpleTreeView aria-label={'Feasibility Report'}>
      <CustomTreeItem
        itemId={cycleFeasibility}
        label={'WorkSchemaNode Feasibilities'}
        labelIcon={getLabelIcon({ passes: true })}
        {...colors}
        forceIconColor={true}
      >
        {report.nodeCycleFeasibilities.map((nodeCycleFeasibility) => (
          <FeasibilityReportTreeItem
            itemType={'cycleFeasibility'}
            payload={nodeCycleFeasibility}
            key={`${nodeCycleFeasibility.id}:nodeFeasibility`}
          />
        ))}
      </CustomTreeItem>
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
      <CustomTreeItem
        itemId={taskTypeClassificationFeasibilities}
        label={'WorkTaskType classification feasibilities'}
        labelIcon={getLabelIcon(report)}
        {...colors}
        forceIconColor={true}
      >
        {report.taskTypeClassificationFeasibilities.map(
          (taskTypeClassificationFeasibility) => (
            <FeasibilityReportTreeItem
              itemType={classificationFeasibility}
              payload={taskTypeClassificationFeasibility}
              key={`${classificationFeasibility}:${taskTypeClassificationFeasibility.id}`}
            />
          )
        )}
      </CustomTreeItem>
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

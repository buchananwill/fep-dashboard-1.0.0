'use client';

import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { FeasibilityReportFullDto } from '@/api/dtos/FeasibilityReportFullDtoSchema';
import { HasId } from '@/api/types';
import { BaseDtoUiProps } from 'dto-stores';
import { PropsWithChildren } from 'react';
import { getEntityNamespaceKeyWithDto } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceKeyWithDto';
import { CustomTreeItem } from '@/app/test/CustomTreeItem';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import FeasibilityReportTreeItem from '@/app/test/FeasilbilityReportTreeItem';

export const taskTypeClassification = 'taskTypeClassification';
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

export default function FeasibilityReport({
  report
}: {
  report: FeasibilityReportFullDto;
}) {
  return (
    <SimpleTreeView aria-label={'Feasibility Report'}>
      <CustomTreeItem
        itemId={cycleFeasibility}
        label={'WorkSchemaNode Feasibilities'}
        labelIcon={getLabelIcon({ passes: true })}
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
      <TreeItem
        itemId={taskTypeClassificationFeasibilities}
        label={'Task Type Feasibility List'}
      >
        {report.taskTypeClassificationFeasibilities.map(
          (taskTypeClassificationFeasibility) => (
            <EntityTreeItem
              entityClass={taskTypeClassificationFeasibilities}
              entity={taskTypeClassificationFeasibility}
              key={getEntityNamespaceKeyWithDto(
                taskTypeClassificationFeasibilities,
                taskTypeClassificationFeasibility
              )}
            >
              <ul>
                {taskTypeClassificationFeasibility.bandwidthFeasibilityLayers.map(
                  (bandwidthFeasibilityLayer) => (
                    <li key={bandwidthFeasibilityLayer.id}>
                      {bandwidthFeasibilityLayer.layerOrdinal}:{' '}
                      {bandwidthFeasibilityLayer.residual}
                      <TreeItem
                        itemId={`layerItems${bandwidthFeasibilityLayer.id}`}
                      >
                        {bandwidthFeasibilityLayer.bandwidthFeasibilityLayerItems.map(
                          (bandwidthFeasibilityLayerItem) => (
                            <div key={bandwidthFeasibilityLayerItem.id}>
                              {
                                bandwidthFeasibilityLayerItem.taskTypeClassificationId
                              }
                            </div>
                          )
                        )}
                      </TreeItem>
                    </li>
                  )
                )}
              </ul>
            </EntityTreeItem>
          )
        )}
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

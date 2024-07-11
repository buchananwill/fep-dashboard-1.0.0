'use client';

import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { HasId } from '@/api/types';
import { BaseDtoUiProps } from 'dto-stores';
import { PropsWithChildren } from 'react';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import FeasibilityReportTreeItem from '@/app/feasibility-report/_components/FeasilbilityReportTreeItem';
import { FullReport } from '@/app/feasibility-report/_components/types';

export const taskTypeClassification = 'TaskTypeClassification';
export const taskTypeClassificationItem = 'taskTypeClassificationItem';
export const cycleFeasibility = 'nodeCycleFeasibility';
export const assignmentFeasibility = 'nodeAssignmentFeasibility';
export const taskTypeClassificationFeasibilities =
  'taskTypeClassificationFeasibilities';

export function getLabelIcon({ passes }: { passes: boolean }) {
  return { labelIcon: passes ? CheckCircleOutline : HighlightOff };
}

const classificationFeasibility = 'taskTypeClassificationFeasibility';
export default function FeasibilityReport({ report }: { report: FullReport }) {
  return (
    <SimpleTreeView
      aria-label={'Feasibility Report'}
      sx={{ flexGrow: 1, maxWidth: 600 }}
    >
      <FeasibilityReportTreeItem payload={report} />
    </SimpleTreeView>
  );
}

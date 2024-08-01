'use client';

import { SimpleTreeView } from '@mui/x-tree-view';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import FeasibilityReportTreeItem from '@/components/feasibility-report/FeasilbilityReportTreeItem';
import { FullReport } from '@/components/feasibility-report/types';

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

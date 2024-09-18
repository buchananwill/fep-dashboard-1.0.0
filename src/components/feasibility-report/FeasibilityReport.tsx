'use client';

import { SimpleTreeView } from '@mui/x-tree-view';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import FeasibilityReportTreeItem from '@/components/feasibility-report/FeasilbilityReportTreeItem';
import { FullReport } from '@/components/feasibility-report/types';
import TransformToTreeItemProps from '@/components/feasibility-report/TransformToTreeItemProps';
import { AccordionTree } from '@/app/test/accordionTree';

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
  const items = TransformToTreeItemProps({ payload: report });

  return (
    <div className={'w-[75vw]'}>
      <SimpleTreeView
        aria-label={'Feasibility Report'}
        sx={{ flexGrow: 1, maxWidth: 600 }}
      >
        <FeasibilityReportTreeItem payload={report} />
      </SimpleTreeView>
      <AccordionTree
        items={[items]}
        itemClasses={{ trigger: 'data-[hover=true]:opacity-50' }}
      />
    </div>
  );
}

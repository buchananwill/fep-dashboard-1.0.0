'use client';

import { FullReport } from '@/components/feasibility-report/types';
import TransformToTreeItemProps from '@/components/feasibility-report/TransformToTreeItemProps';
import { AccordionTree } from '@/app/test/accordionTree';

export const taskTypeClassification = 'TaskTypeClassification';

export default function FeasibilityReport({ report }: { report: FullReport }) {
  const items = TransformToTreeItemProps({ payload: report });

  return (
    <div className={'w-[75vw]'}>
      <AccordionTree
        items={[items]}
        itemClasses={{ trigger: 'data-[hover=true]:opacity-50' }}
      />
    </div>
  );
}

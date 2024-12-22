import { ReactNode } from 'react';
import { WorkPlanRequestWizardStepProps } from '@/components/work-plan-request/WorkPlanRequestController';
import { SelectYearStep } from '@/components/work-plan-request/SelectYearStep';
import { ChooseNameStep } from '@/components/work-plan-request/ChooseNameStep';
import { SetStudentSize } from '@/components/work-plan-request/SetStudentSize';
import { IndependentBundle } from '@/components/work-plan-request/IndependentBundle';

export const steps: {
  label: string;
  description: string;
  component?: (props: WorkPlanRequestWizardStepProps) => ReactNode;
}[] = [
  {
    label: 'Select Year',
    description:
      'Select the year group to generate a classes and lessons plan for.',
    component: SelectYearStep
  },
  {
    label: 'Name',
    description: 'Choose a unique name for this plan',
    component: ChooseNameStep
  },
  {
    label: 'Size',
    description: 'Set the total number of students',
    component: SetStudentSize
  },
  {
    label: 'Independent Bundles',
    description: 'Select lesson types to be assigned as an independent bundles',
    component: IndependentBundle
  },
  {
    label: 'Synchronized Bundles',
    description:
      'Select subsets of lessons types to be assigned as synchronized bundles'
  }
];

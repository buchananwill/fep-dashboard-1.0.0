import { useGlobalDispatchAndListener } from 'selective-context';
import { initialRequest } from '@/components/work-plan-request/workPlanRequestInitial';
import { WorkPlanRequest } from '@/api/generated-types/generated-types_';
import {
  workPlanGeneratorWizard,
  WorkPlanRequestWizardStepProps
} from '@/components/work-plan-request/WorkPlanRequestController';
import { ReactNode } from 'react';

export function WorkPlanRequestWizardStepWrapper({
  initialValue,
  children: ChildrenComponent
}: {
  initialValue?: WorkPlanRequest;
  children: (props: WorkPlanRequestWizardStepProps) => ReactNode;
}) {
  const dispatchAndListener = useGlobalDispatchAndListener({
    contextKey: workPlanGeneratorWizard,
    listenerKey: 'step-wrapper',
    initialValue: initialValue ?? initialRequest
  });

  return ChildrenComponent ? (
    <ChildrenComponent {...dispatchAndListener} />
  ) : null;
}

import { useGlobalController } from 'selective-context';
import { initialRequest } from '@/components/work-plan-request/workPlanRequestInitial';
import { WorkPlanRequest } from '@/api/generated-types/generated-types_';
import { DispatchState } from '@/types';

export function WorkPlanRequestController({
  initialValue
}: {
  initialValue?: WorkPlanRequest;
}) {
  const { currentState } = useGlobalController({
    contextKey: 'work-plan-generator-wizard',
    listenerKey: 'root',
    initialValue: initialValue ?? initialRequest
  });

  return null;
}

export type WorkPlanRequestWizardStepProps = {
  currentState: WorkPlanRequest;
  dispatchWithoutControl?: DispatchState<WorkPlanRequest>;
};

import { useGlobalController } from 'selective-context';
import { initialRequest } from '@/components/work-plan-request/workPlanRequestInitial';
import { WorkPlanRequest } from '@/api/generated-types/generated-types_';
import { DispatchState } from '@/types';
import { EditAddDeleteDtoControllerArray, NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import { KEY_TYPES } from 'dto-stores/dist/literals';

export const workPlanGeneratorWizard = 'work-plan-generator-wizard';

export function WorkPlanRequestController({
  initialValue
}: {
  initialValue?: WorkPlanRequest;
}) {
  const { currentState } = useGlobalController({
    contextKey: workPlanGeneratorWizard,
    listenerKey: 'root',
    initialValue: initialValue ?? initialRequest
  });

  return (
    <EditAddDeleteDtoControllerArray
      entityClass={EntityClassMap.parallelWorkPlan}
      dtoList={EmptyArray}
    />
  );
}

export type WorkPlanRequestWizardStepProps = {
  currentState: WorkPlanRequest;
  dispatchWithoutControl?: DispatchState<WorkPlanRequest>;
};

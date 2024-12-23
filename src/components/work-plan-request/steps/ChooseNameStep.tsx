import { WorkPlanRequestWizardStepProps } from '@/components/work-plan-request/WorkPlanRequestController';
import { TextInput } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { updateNestedValueWithLodash } from '@/functions/updateNestedValue';

export function ChooseNameStep({
  currentState,
  dispatchWithoutControl
}: WorkPlanRequestWizardStepProps) {
  const onChange = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      if (dispatchWithoutControl) {
        dispatchWithoutControl((prevState) =>
          updateNestedValueWithLodash(
            prevState,
            'planName',
            changeEvent.target.value
          )
        );
      }
    },
    [dispatchWithoutControl]
  );

  return (
    <TextInput value={currentState.planName} onChange={onChange}></TextInput>
  );
}

import { WorkPlanRequestWizardStepProps } from '@/components/work-plan-request/WorkPlanRequestController';
import { NumberInput } from '@mantine/core';
import { useCallback } from 'react';
import { updateNestedValueWithLodash } from '@/functions/updateNestedValue';
import { notifications } from '@mantine/notifications';

export function SetStudentSize({
  currentState,
  dispatchWithoutControl
}: WorkPlanRequestWizardStepProps) {
  const onChange = useCallback(
    (value: string | number) => {
      if (dispatchWithoutControl) {
        if (typeof value === 'number') {
          dispatchWithoutControl((prevState) =>
            updateNestedValueWithLodash(prevState, 'numberOfUsers', value)
          );
        } else {
          notifications.show({
            message: 'Invalid value entered - must be number.'
          });
        }
      }
    },
    [dispatchWithoutControl]
  );

  return <NumberInput onChange={onChange} value={currentState.numberOfUsers} />;
}

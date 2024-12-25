import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { NumberInput } from '@mantine/core';
import { useGlobalDispatch } from 'selective-context';
import { workPlanGeneratorWizard } from '@/components/work-plan-request/WorkPlanRequestController';
import { useCallback } from 'react';
import { WorkPlanRequest } from '@/api/generated-types/generated-types_';
import { isNotNullish } from '@/api/main';

export function EditGroupSizeCell({
  entityClass,
  value,
  entityId
}: IdInnerCellProps<number>) {
  const { dispatchWithoutListen } = useGlobalDispatch<WorkPlanRequest>(
    workPlanGeneratorWizard
  );

  const onChange = useCallback(
    (value: number | string) => {
      dispatchWithoutListen((prev) => {
        const mutable = { ...prev };
        mutable.synchronizedWorkPlanRequests =
          mutable.synchronizedWorkPlanRequests.map((request) => {
            if (request.id !== entityId) return request;
            else {
              const copy = { ...request };
              copy.groupSize =
                typeof value === 'number' ? value : parseInt(value);
              return copy;
            }
          });

        return mutable;
      });
    },
    [dispatchWithoutListen, entityId]
  );

  return (
    <NumberInput
      min={1}
      max={10}
      value={value}
      onChange={onChange}
    ></NumberInput>
  );
}

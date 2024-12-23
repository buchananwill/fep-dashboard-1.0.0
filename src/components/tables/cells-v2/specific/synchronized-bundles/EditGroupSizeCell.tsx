import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { NumberInput } from '@mantine/core';
import { useGlobalDispatch } from 'selective-context';
import { workPlanGeneratorWizard } from '@/components/work-plan-request/WorkPlanRequestController';
import { useCallback } from 'react';
import { WorkPlanRequest } from '@/api/generated-types/generated-types_';

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
        const { repeatCountToParallelWorkPlanRequests } = mutable;
        const parallelWorkPlanRequest = structuredClone(
          repeatCountToParallelWorkPlanRequests[entityId]
        );
        parallelWorkPlanRequest.groupSize =
          typeof value === 'number' ? value : parseInt(value);
        mutable.repeatCountToParallelWorkPlanRequests = {
          ...repeatCountToParallelWorkPlanRequests
        };
        mutable.repeatCountToParallelWorkPlanRequests[entityId] =
          parallelWorkPlanRequest;
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

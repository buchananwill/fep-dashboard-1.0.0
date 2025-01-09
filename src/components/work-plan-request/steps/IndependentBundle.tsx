import { WorkPlanRequestWizardStepProps } from '@/components/work-plan-request/WorkPlanRequestController';
import { useCallback, useMemo } from 'react';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { SelectApiParamsMultiFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types_';
import { updateNestedValueWithLodash } from '@/functions/updateNestedValue';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';
import { useLabelMaker } from '@/hooks/select-adaptors/useLabelMaker';
import { sortBy } from 'lodash';
import { useWpssQueryWithWorkPlanRequest } from '@/components/work-plan-request/steps/useWpssQueryWithWorkPlanRequest';
import { useRemainingUnselectedSchemas } from '@/components/work-plan-request/steps/SynchronizedBundles';

export function useKnowledgeDomainWorkProjectSeriesSchemaLabel() {
  return useLabelMaker<WorkProjectSeriesSchemaDto>(
    'workType.knowledgeDomain.name'
  );
}

export function sortByKnowledgeDomainWpss(
  data: WorkProjectSeriesSchemaDto[] | undefined
) {
  return sortBy(data ?? [], (item) => item.workType.knowledgeDomain.name);
}

export function useSortWpssByKnowledgeDomainName(
  data: WorkProjectSeriesSchemaDto[] | undefined
) {
  return useMemo(() => {
    return sortByKnowledgeDomainWpss(data);
  }, [data]);
}

export function IndependentBundle({
  currentState,
  dispatchWithoutControl
}: WorkPlanRequestWizardStepProps) {
  const { data } = useWpssQueryWithWorkPlanRequest(currentState);
  const sortedData = useSortWpssByKnowledgeDomainName(data);

  const selection = useMemo(() => {
    const idSet = new Set(currentState.independentWorkSchemas);
    return sortedData.filter((dto) => idSet.has(dto.id));
  }, [currentState.independentWorkSchemas, sortedData]);

  const workProjectSeriesSchemaDtos = useRemainingUnselectedSchemas(
    currentState,
    sortedData
  );

  const availableHere = useMemo(() => {
    return sortByKnowledgeDomainWpss([
      ...workProjectSeriesSchemaDtos,
      ...selection
    ]);
  }, [workProjectSeriesSchemaDtos, selection]);

  const propagateChange = useCallback(
    (value: WorkProjectSeriesSchemaDto[]) => {
      if (dispatchWithoutControl) {
        dispatchWithoutControl((prevState) =>
          updateNestedValueWithLodash(
            prevState,
            'independentWorkSchemas',
            value.map((dto) => dto.id)
          )
        );
      }
    },
    [dispatchWithoutControl]
  );
  const labelMaker = useKnowledgeDomainWorkProjectSeriesSchemaLabel();

  const selectApi = useSelectApi<
    SelectApiParamsMultiFlat<WorkProjectSeriesSchemaDto>
  >({
    rawData: availableHere,
    type: 'multiFlat',
    labelMaker,
    value: selection,
    propagateChange
  });

  return <TransferList {...selectApi} mah={'24em'} />;
}

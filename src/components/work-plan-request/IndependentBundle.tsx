import { WorkPlanRequestWizardStepProps } from '@/components/work-plan-request/WorkPlanRequestController';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { api } from '@/api/v3/clientApiV3';
import { EntityClassMap } from '@/api/entity-class-map';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { SelectApiParamsMultiFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types_';
import { EmptyArray } from '@/api/literals';
import { nameAccessor } from '@/functions/nameSetter';
import { updateNestedValueWithLodash } from '@/functions/updateNestedValue';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';
import { useLabelMaker } from '@/hooks/select-adaptors/useLabelMaker';
import { sortBy } from 'lodash';

export function IndependentBundle({
  currentState,
  dispatchWithoutControl
}: WorkPlanRequestWizardStepProps) {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      api('workProjectSeriesSchema', 'getDtoListByExampleList', {
        exampleList: [
          {
            workTaskType: {
              knowledgeLevel: { name: currentState.organizationTypeName }
            }
          }
        ]
      }),
    queryKey: [
      EntityClassMap.workProjectSeriesSchema,
      currentState.organizationTypeName
    ]
  });

  const sortedData = useMemo(() => {
    return sortBy(data ?? [], (item) => item.workTaskType.knowledgeDomain.name);
  }, [data]);

  const selection = useMemo(() => {
    const idSet = new Set(currentState.independentWorkSchemas);
    return sortedData.filter((dto) => idSet.has(dto.id));
  }, [currentState, sortedData]);

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

  const labelMaker = useLabelMaker<WorkProjectSeriesSchemaDto>(
    'workTaskType.knowledgeDomain.name'
  );

  const selectApi = useSelectApi<
    SelectApiParamsMultiFlat<WorkProjectSeriesSchemaDto>
  >({
    rawData: sortedData,
    type: 'multiFlat',
    labelMaker,
    value: selection,
    propagateChange
  });

  return <TransferList {...selectApi} mah={'24em'} />;
}

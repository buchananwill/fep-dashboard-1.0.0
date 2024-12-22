import { KnowledgeLevelDto } from '@/api/generated-types/generated-types_';
import { WorkPlanRequestWizardStepProps } from '@/components/work-plan-request/WorkPlanRequestController';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/v3/clientApiV3';
import { EntityClassMap } from '@/api/entity-class-map';
import { nameAccessor } from '@/functions/nameSetter';
import { useCallback, useMemo } from 'react';
import { useSelectAutocompleteApi } from '@/hooks/select-adaptors/useSelectAutocompleteApi';
import { Autocomplete } from '@mantine/core';

export function SelectYearStep({
  currentState,
  dispatchWithoutControl
}: WorkPlanRequestWizardStepProps) {
  const { data, isLoading } = useQuery({
    queryFn: () => api('knowledgeLevel', 'getAll', {}),
    queryKey: [EntityClassMap.knowledgeLevel, 'all']
  });

  const selectedYear = useMemo(() => {
    return (data ?? []).find(
      (knowledgeLevel) =>
        knowledgeLevel.name === currentState.organizationTypeName
    );
  }, [data, currentState]);

  const propagateChange = useCallback(
    (selectedYear: KnowledgeLevelDto | undefined) => {
      if (dispatchWithoutControl && selectedYear) {
        dispatchWithoutControl((prev) => ({
          ...prev,
          organizationTypeName: selectedYear.name
        }));
      }
    },
    []
  );

  const autocompleteApi = useSelectAutocompleteApi({
    rawData: data ?? [],
    labelMaker: nameAccessor,
    value: selectedYear,
    propagateChange,
    type: 'singleFlat',
    allowUndefined: true
  });

  return <Autocomplete {...autocompleteApi} />;
}

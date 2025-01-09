import { WorkPlanRequest } from '@/api/generated-types/generated-types_';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/v3/clientApiV3';
import { EntityClassMap } from '@/api/entity-class-map';

export function useWpssQueryWithWorkPlanRequest(currentState: WorkPlanRequest) {
  return useQuery({
    queryFn: () =>
      api('workProjectSeriesSchema', 'getDtoListByExampleList', {
        exampleList: [
          {
            workType: {
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
}

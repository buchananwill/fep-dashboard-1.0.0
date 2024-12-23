'use server';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { requestTest } from '@/app/data-entry/test/workPlanRequest';
import { BASE_URL } from '@/api/BASE_URL';
import { WorkPlanRequest } from '@/api/generated-types/generated-types_';

export async function submitWorkPlanRequest(request: WorkPlanRequest) {
  return postEntitiesWithDifferentReturnType(
    request,
    `${BASE_URL}/api/v2/workSchemaNodes/generateWorkPlan`
  );
}

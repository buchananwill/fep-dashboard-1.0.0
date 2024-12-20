'use server';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { requestTest } from '@/app/data-entry/test/workPlanRequest';
import { BASE_URL } from '@/api/BASE_URL';

export async function testAction() {
  return postEntitiesWithDifferentReturnType(
    requestTest,
    `${BASE_URL}/api/v2/workSchemaNodes/generateWorkPlan`
  );
}

'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { FeasibilityReportDto } from '@/api/generated-types/generated-types';

export async function createFeasibilityReport(cycleId: number) {
  return postEntitiesWithDifferentReturnType<
    Partial<FeasibilityReportDto>,
    FeasibilityReportDto
  >(
    { cycleId: cycleId },
    constructUrl(`/api/v2/schedule/feasibilityReport/create`)
  );
}

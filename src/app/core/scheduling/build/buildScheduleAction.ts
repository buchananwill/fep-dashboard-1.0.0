'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { ScheduleDto } from '@/api/dtos/ScheduleDtoSchema';

export async function buildScheduleAction(cycleId: number) {
  return postEntitiesWithDifferentReturnType<null, ScheduleDto>(
    null,
    constructUrl(
      `/api/v2/schedule/doBuild?cycleId=${cycleId}&saveBuild=${true}`
    )
  );
}

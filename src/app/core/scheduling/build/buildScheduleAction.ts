'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { ScheduleDto } from '@/api/dtos/ScheduleDtoSchema';
import { AutoBuildParametersDto } from '@/api/generated-types/generated-types_';
import { parseTen } from '@/api/date-and-time';

export async function buildScheduleAction(
  cycleId: number,
  requestBody: AutoBuildParametersDto
) {
  return postEntitiesWithDifferentReturnType<
    AutoBuildParametersDto,
    ScheduleDto
  >(requestBody, constructUrl(`/api/v2/schedule/doBuild?cycleId=${cycleId}`));
}

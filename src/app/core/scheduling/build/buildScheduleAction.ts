'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { ScheduleDto } from '@/api/zod-schemas/ScheduleDtoSchema';
import {
  AutoBuildParametersDto,
  ScheduleParametersDto
} from '@/api/generated-types/generated-types';
import { parseTen } from '@/api/date-and-time';

export async function buildScheduleAction(
  cycleId: number,
  requestBody: ScheduleParametersDto
) {
  return postEntitiesWithDifferentReturnType<
    ScheduleParametersDto,
    ScheduleDto
  >(requestBody, constructUrl(`/api/v2/schedule/doBuild?cycleId=${cycleId}`));
}

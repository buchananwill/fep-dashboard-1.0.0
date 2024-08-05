'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { ScheduleDto } from '@/api/dtos/ScheduleDtoSchema';
import { AutoBuildParametersDto } from '@/api/generated-types/generated-types_';
import { parseTen } from '@/api/date-and-time';

const MULTI_STEP_UNDO_MS = parseTen(process.env.MULTI_STEP_UNDO_MS!);
const MULTI_UNDO_INCREMENT = parseTen(process.env.MULTI_UNDO_INCREMENT!);

export async function buildScheduleAction(
  cycleId: number,
  requestBody: AutoBuildParametersDto
) {
  return postEntitiesWithDifferentReturnType<
    AutoBuildParametersDto,
    ScheduleDto
  >(requestBody, constructUrl(`/api/v2/schedule/doBuild?cycleId=${cycleId}`));
}

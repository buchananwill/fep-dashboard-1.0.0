'use server';
import { initSafely } from '@/utils/init-database-functions/initSafely';
import data from '@/utils/init-json-data/work-project-series-schema/LessonAllocations.json';
import { getDtoListByExampleList } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { PartialDeep } from 'type-fest';
import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema';

import { BASE_URL } from '@/api/BASE_URL';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';

export async function initWorkProjectSeriesSchemas(
  workTaskTypeList: WorkTaskTypeDto[]
) {
  const exampleList: PartialDeep<WorkProjectSeriesSchemaDto>[] =
    workTaskTypeList.map((wtt) => ({ workTaskType: wtt }));
  data.periodsInReferenceCycle = 58;
  data.targetCycleId = 104;
  return initSafely(
    () => getDtoListByExampleList(exampleList),
    () =>
      postEntitiesWithDifferentReturnType(
        data,
        `${BASE_URL}/api/v2/workProjectSeriesSchemas/createFromSchoolYearPlans`
      )
  );
}

'use server';
import { initSafely } from '@/utils/init-database-functions/initSafely';
import data from '@/utils/init-json-data/work-project-series-schema/LessonAllocations.json';
import {
  getAll,
  getDtoListByExampleList
} from '@/api/generated-actions/WorkProjectSeriesSchema';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { BASE_URL } from '@/api/main';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { PartialDeep } from 'type-fest';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';

export async function initWorkProjectSeriesSchemas(
  workTaskTypeList: WorkTaskTypeDto[]
) {
  const exampleList: PartialDeep<WorkProjectSeriesSchemaDto>[] =
    workTaskTypeList.map((wtt) => ({ workTaskTypeId: wtt.id }));
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

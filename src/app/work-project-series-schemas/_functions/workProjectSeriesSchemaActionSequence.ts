import { getDtoListByExampleList as getWorkTaskTypesByExample } from '@/api/generated-actions/WorkTaskType';

import { getDtoListByExampleList as getWorkProjectSeriesSchemasByExample } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { PartialDeep } from 'type-fest';
import {
  WorkProjectSeriesSchemaDto,
  WorkTaskTypeDto
} from '@/api/generated-types/generated-types';

export type WorkProjectSeriesSchemaFetchParams = PartialDeep<WorkTaskTypeDto>;

export async function workProjectSeriesSchemaActionSequence(
  example: WorkProjectSeriesSchemaFetchParams
): Promise<{
  workTaskTypes: WorkTaskTypeDto[];
  workProjectSeriesSchemas: WorkProjectSeriesSchemaDto[];
}> {
  const workTaskTypes = await getWorkTaskTypesByExample([example]);

  const workProjectSeriesSchemas = await getWorkProjectSeriesSchemasByExample(
    workTaskTypes.map((wtt) => ({ workTaskTypeId: wtt.id }))
  );

  return { workTaskTypes, workProjectSeriesSchemas };
}

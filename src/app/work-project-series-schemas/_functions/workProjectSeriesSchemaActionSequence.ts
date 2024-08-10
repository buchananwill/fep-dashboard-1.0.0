import { getDtoListByExampleList as getWorkTaskTypesByExample } from '@/api/generated-actions/WorkTaskType';

import { getDtoListByExampleList as getWorkProjectSeriesSchemasByExample } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { WorkTaskTypeDto } from '@/api/zod-schemas/WorkTaskTypeDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema';

export type WorkProjectSeriesSchemaFetchParams = Partial<WorkTaskTypeDto>;

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

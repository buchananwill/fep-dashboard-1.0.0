import { getDtoListByExampleList as getWorkTaskTypesByExample } from '@/app/api/generated-actions/WorkTaskType';

import { getDtoListByExampleList as getWorkProjectSeriesSchemasByExample } from '@/app/api/generated-actions/WorkProjectSeriesSchema';
import { WorkTaskTypeDto } from '@/app/api/dtos/WorkTaskTypeDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { actionResponseHandler } from '@/utils/data-fetching/actionResponseHandler';

export interface WorkProjectSeriesSchemaFetchParams {
  levelOrdinal: number;
}

export async function workProjectSeriesSchemaActionSequence({
  levelOrdinal
}: WorkProjectSeriesSchemaFetchParams): Promise<{
  workTaskTypes: WorkTaskTypeDto[];
  workProjectSeriesSchemas: WorkProjectSeriesSchemaDto[];
}> {
  const workTaskTypes = await getWorkTaskTypesByExample([
    { knowledgeLevelLevelOrdinal: levelOrdinal }
  ]);

  const workProjectSeriesSchemas = await getWorkProjectSeriesSchemasByExample(
    workTaskTypes.map((wtt) => ({ workTaskTypeId: wtt.id }))
  );

  return { workTaskTypes, workProjectSeriesSchemas };
}

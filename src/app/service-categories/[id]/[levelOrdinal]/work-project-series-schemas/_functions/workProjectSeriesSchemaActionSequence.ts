import { getDtoListByExampleList as getWorkTaskTypesByExample } from '@/api/generated-actions/WorkTaskType';

import { getDtoListByExampleList as getWorkProjectSeriesSchemasByExample } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';

export interface WorkProjectSeriesSchemaFetchParams {
  levelOrdinal: number;
  serviceCategoryId: number;
}

export async function workProjectSeriesSchemaActionSequence({
  levelOrdinal,
  serviceCategoryId
}: WorkProjectSeriesSchemaFetchParams): Promise<{
  workTaskTypes: WorkTaskTypeDto[];
  workProjectSeriesSchemas: WorkProjectSeriesSchemaDto[];
}> {
  const workTaskTypes = await getWorkTaskTypesByExample([
    {
      knowledgeLevelLevelOrdinal: levelOrdinal,
      serviceCategoryId: serviceCategoryId
    }
  ]);

  const workProjectSeriesSchemas = await getWorkProjectSeriesSchemasByExample(
    workTaskTypes.map((wtt) => ({ workTaskTypeId: wtt.id }))
  );

  return { workTaskTypes, workProjectSeriesSchemas };
}

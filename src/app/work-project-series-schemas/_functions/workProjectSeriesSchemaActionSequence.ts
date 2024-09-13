import { getDtoListByExampleList as getWorkTaskTypesByExample } from '@/api/generated-actions/WorkTaskType';

import { PartialDeep } from 'type-fest';
import {
  WorkProjectSeriesSchemaDto,
  WorkTaskTypeDto
} from '@/api/generated-types/generated-types';
import { Api } from '@/api/clientApi_';

export type WorkProjectSeriesSchemaFetchParams = PartialDeep<WorkTaskTypeDto>;

export async function workProjectSeriesSchemaActionSequence(
  example: WorkProjectSeriesSchemaFetchParams
): Promise<{
  workTaskTypes: WorkTaskTypeDto[];
  workProjectSeriesSchemas: WorkProjectSeriesSchemaDto[];
}> {
  const workTaskTypes = await getWorkTaskTypesByExample([example]);

  const workProjectSeriesSchemas =
    await Api.WorkProjectSeriesSchema.getDtoListByExampleList(
      workTaskTypes.map((wtt) => ({ workTaskType: wtt }))
    );

  return { workTaskTypes, workProjectSeriesSchemas };
}

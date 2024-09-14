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
  const workTaskTypes = await Api.WorkTaskType.getDtoListByExampleList([
    example
  ]);

  const workProjectSeriesSchemas =
    await Api.WorkProjectSeriesSchema.getDtoListByExampleList(
      workTaskTypes.map((wtt) => ({ workTaskType: wtt }))
    );

  return { workTaskTypes, workProjectSeriesSchemas };
}

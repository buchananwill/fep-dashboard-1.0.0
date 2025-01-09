import { PartialDeep } from 'type-fest';
import {
  WorkProjectSeriesSchemaDto,
  WorkTypeDto
} from '@/api/generated-types/generated-types_';
import { Api } from '@/api/clientApi_';

export type WorkProjectSeriesSchemaFetchParams = PartialDeep<WorkTypeDto>;

export async function workProjectSeriesSchemaActionSequence(
  example: WorkProjectSeriesSchemaFetchParams
): Promise<{
  workTypes: WorkTypeDto[];
  workProjectSeriesSchemas: WorkProjectSeriesSchemaDto[];
}> {
  const workTypes = await Api.WorkType.getDtoListByExampleList([example]);

  const workProjectSeriesSchemas =
    await Api.WorkProjectSeriesSchema.getDtoListByExampleList(
      workTypes.map((wtt) => ({ workType: wtt }))
    );

  return { workTypes, workProjectSeriesSchemas };
}

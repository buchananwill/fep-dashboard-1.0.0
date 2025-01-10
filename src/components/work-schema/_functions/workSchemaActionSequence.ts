import { PartialDeep } from 'type-fest';
import {
  WorkSchemaDto,
  WorkTypeDto
} from '@/api/generated-types/generated-types_';
import { Api } from '@/api/clientApi_';

export type WorkSchemaFetchParams = PartialDeep<WorkTypeDto>;

export async function workSchemaActionSequence(
  example: WorkSchemaFetchParams
): Promise<{
  workTypes: WorkTypeDto[];
  workSchemas: WorkSchemaDto[];
}> {
  const workTypes = await Api.WorkType.getDtoListByExampleList([example]);

  const workSchemas = await Api.WorkSchema.getDtoListByExampleList(
    workTypes.map((wtt) => ({ workType: wtt }))
  );

  return { workTypes, workSchemas };
}

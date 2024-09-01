import { TemplateRequestOverrides } from '@/api/types';

import { RequestCreationParams } from '@/utils/init-object-literals/requestCreationParams';
import { PartialDeep } from 'type-fest';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';

export function createRequestRecordCombiner(
  globalSuitabilities: PartialDeep<WorkTaskTypeDto>[]
) {
  return function ([
    name,
    count,
    workTaskTypeExampleList
  ]: RequestCreationParams) {
    const response: Record<string, TemplateRequestOverrides<any>> = {};
    response[name] = {
      count,
      postRequest: {
        workTaskTypeExampleList: [
          ...workTaskTypeExampleList,
          ...globalSuitabilities
        ]
      }
    };
    return response;
  };
}

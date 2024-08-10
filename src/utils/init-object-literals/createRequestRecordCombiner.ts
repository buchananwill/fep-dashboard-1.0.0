import { WorkTaskTypeDto } from '@/api/zod-schemas/WorkTaskTypeDtoSchema';
import { TemplateRequestOverrides } from '@/api/types';

import { RequestCreationParams } from '@/utils/init-object-literals/requestCreationParams';

export function createRequestRecordCombiner(
  globalSuitabilities: Partial<WorkTaskTypeDto>[]
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

import { TemplateRequestOverrides } from '@/api/types';

import { RequestCreationParams } from '@/utils/init-object-literals/requestCreationParams';
import { PartialDeep } from 'type-fest';
import { WorkTypeDto } from '@/api/generated-types/generated-types_';

export function createRequestRecordCombiner(
  globalSuitabilities: PartialDeep<WorkTypeDto>[]
) {
  return function ([name, count, workTypeExampleList]: RequestCreationParams) {
    const response: Record<string, TemplateRequestOverrides<any>> = {};
    response[name] = {
      count,
      postRequest: {
        workTypeExampleList: [...workTypeExampleList, ...globalSuitabilities]
      }
    };
    return response;
  };
}

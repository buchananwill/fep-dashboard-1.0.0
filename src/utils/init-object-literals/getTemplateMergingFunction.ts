import {
  BulkRepeatPostRequest,
  RepeatPostRequest,
  TemplateRequestOverrides
} from '@/api/types';
import { mapToRepeatPostRequest } from '@/utils/init-object-literals/mapToRepeatPostRequest';

export function getTemplateMergingFunction<T>(
  templatedRepeatRequest: RepeatPostRequest<T>
) {
  return function (
    requestMap: Record<string, TemplateRequestOverrides<T>>
  ): BulkRepeatPostRequest<T> {
    const repeatPostRequestMap = Object.fromEntries(
      Object.entries(requestMap).map(([key, value]) => [
        key,
        mapToRepeatPostRequest(value, templatedRepeatRequest)
      ])
    );
    return { repeatPostRequestMap };
  };
}

import { RepeatPostRequest, TemplateRequestOverrides } from '@/api/types';
import { merge } from 'lodash';

export function mapToRepeatPostRequest<T>(
  overrides: TemplateRequestOverrides<T>,
  template: RepeatPostRequest<T>
): RepeatPostRequest<T> {
  const clonedTemplate = structuredClone(template);
  return merge(clonedTemplate, overrides);
}
import { GenericNestedDto } from '@/api/generated-types/generated-types';

export function flattenNestedEntity<T>(asNested: GenericNestedDto<T>): T[] {
  return [asNested.data, ...asNested.children.flatMap(flattenNestedEntity)];
}
import { camelCase } from 'lodash';

export function snakeToCamelKey(anyObject: Object) {
  return Object.fromEntries(
    Object.entries(anyObject).map(([key, value]) => [camelCase(key), value])
  );
}
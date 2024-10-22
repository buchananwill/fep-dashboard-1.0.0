import { OptionallyHasColorDto } from '@/components/tables/cells/EditColorCell';
import { ColorDto } from '@/api/generated-types/generated-types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { set } from 'lodash';

export function ColorUpdater<T extends OptionallyHasColorDto>(
  prev: T,
  color: ColorDto | undefined
) {
  return {
    ...prev,
    color
  };
}

export function getStringUpdater<
  T extends Object,
  T_STRING_PATH extends string & TypedPaths<T, string> = string &
    TypedPaths<T, string>
>(stringPath: T_STRING_PATH) {
  return (prev: T, value: string) =>
    set(structuredClone(prev), stringPath, value);
}
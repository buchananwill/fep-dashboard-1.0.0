import { ColorDto } from '@/api/generated-types/generated-types_';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { set, unset } from 'lodash';
import { OptionallyHasColorDto } from '@/components/tables/core-table-types';
import { SetRequired } from 'type-fest';

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

export function getStringUpdaterAllowUndefined<
  T extends Object,
  T_STRING_PATH extends string & TypedPaths<T, string | undefined> = string &
    TypedPaths<T, string | undefined>
>(stringPath: T_STRING_PATH) {
  return (prev: T, value: string | undefined) => {
    const clone = structuredClone(prev);
    if (value === undefined || value.trim().length === 0) {
      unset(clone, stringPath);
    } else {
      set(clone, stringPath, value);
    }
    return clone;
  };
}

export function getNumberUpdater<
  T extends Object,
  T_NUMBER_PATH extends string & TypedPaths<T, number> = string &
    TypedPaths<T, number>
>(stringPath: T_NUMBER_PATH) {
  return (prev: T, value: number) =>
    set(structuredClone(prev), stringPath, value);
}

import { MonoFunction, ValueList } from '@/types';
import { isNotUndefined } from '@/api/main';
import { getMaxMinListLengths } from '@/utils/init-object-literals/genericGeneratorNodeFunctions/getMaxMinListLengths';

export type AccumulatorMap<ReferenceType> = {
  [Property in keyof ReferenceType]: (
    template: ReferenceType,
    list: ReferenceType[Property][],
    maxLength: number,
    minLength: number
  ) => ReferenceType[Property][];
};

function getObjectsAccumulatorFunction<T extends Object>(
  template: T,
  accumulatorMap: AccumulatorMap<T>
): MonoFunction<T[], ValueList<T>> {
  return function (listOfT: T[]): ValueList<T> {
    const entryList = Object.keys(template).map((key) => {
      const accumulatedList = listOfT
        .map((tItem) => {
          return tItem[key as keyof T];
        })
        .filter(isNotUndefined);
      return [key as keyof T, accumulatedList] as [keyof T, T[keyof T][]];
    });
    const { maxLength, minLength } = getMaxMinListLengths(entryList);
    const valueListEntries = Object.keys(template).map((key, index) => {
      const entryValues = entryList[index][1] as T[keyof T][];
      const accumulator = accumulatorMap[key as keyof T];
      return [
        key as keyof T,
        accumulator(template, entryValues, maxLength, minLength)
      ];
    });
    return Object.fromEntries(valueListEntries);
  };
}

import { ValueList } from '@/types';
import { getMaxMinListLengths } from '@/utils/init-object-literals/genericGeneratorNodeFunctions/getMaxMinListLengths';

export type ValueListDeAccumulator<T> = {
  (valueList: ValueList<T>): T[];
};

export type DeAccumulatorMap<T> = {
  // Must be able to return a suitable value when index is out of bounds for the length of the value list for key.
  [Property in keyof T]: (
    valueList: ValueList<T>,
    key: keyof T,
    index: number
  ) => T[Property];
};

export type DeAccumulationMode = 'minimumListLength' | 'maximumListLength';

export function getObjectsDeAccumulatorFunction<T>(
  deAccumulationMap: DeAccumulatorMap<T>,
  deAccumulationMode: DeAccumulationMode
): ValueListDeAccumulator<T> {
  return function (valueList: ValueList<T>): T[] {
    const { maxLength, minLength } = getMaxMinListLengths(
      Object.entries(valueList)
    );
    const responseList: T[] = [];
    const stopIndex =
      deAccumulationMode === 'maximumListLength' ? maxLength : minLength;
    for (let index = 0; index < stopIndex; index++) {
      const entryList = Object.keys(deAccumulationMap).map((key) => {
        const deAccumulationMapElement = deAccumulationMap[key as keyof T];
        return [
          key,
          deAccumulationMapElement(valueList, key as keyof T, index)
        ];
      });
      responseList.push(Object.fromEntries(entryList));
    }
    return responseList;
  };
}

function throwFallbackOutOfRangeError() {
  throw new Error(
    'n must be less than the list length in order to retrieve a repeating item'
  );
}

export function repeatNthItemAtEnd<T>(
  list: T[],
  index: number,
  fallBackIndex: number
) {
  if (fallBackIndex >= list.length) throwFallbackOutOfRangeError();
  return index < list.length ? list[index] : list[fallBackIndex];
}

export function getRepeatAtStartNthItemFunction<T>(
  list: T[],
  padIndex: number,
  itemsNeeded: number
) {
  if (padIndex >= list.length) throwFallbackOutOfRangeError();
  const paddingNeeded = itemsNeeded - list.length;
  return (index: number) => {
    const paddedIndex = index < paddingNeeded ? padIndex : index;
    return list[paddedIndex];
  };
}

export function getPadAtNthItemFunction<T>(
  list: T[],
  padIndex: number,
  itemsNeeded: number
) {
  if (padIndex >= list.length) throwFallbackOutOfRangeError();
  const paddingNeeded = itemsNeeded - list.length;
  return (index: number) => {
    const paddedIndex =
      index <= padIndex
        ? index
        : index - paddingNeeded <= padIndex
          ? padIndex
          : index - paddingNeeded;
    return list[paddedIndex];
  };
}

export function getCycleItemsFunction<T>(
  list: T[],
  direction: 'forward' | 'backward'
) {
  return (index: number) => {
    const moduloIndex = index % list.length;
    const finalIndex =
      direction === 'forward' ? moduloIndex : list.length - 1 - moduloIndex;
    return list[finalIndex];
  };
}

export function getAlternatingDirectionsFunctionWithHeadTailCompensator<T>(
  list: T[]
) {
  const { length } = list;
  const cycleLength = length * 2;
  return (index: number) => {
    const moduloIndex = index % cycleLength;
    const finalIndex =
      moduloIndex < length
        ? index
        : moduloIndex === length
          ? 0
          : moduloIndex + 1 === cycleLength
            ? length - 1
            : cycleLength - (moduloIndex + 1);
    return list[finalIndex];
  };
}

import { ValueList } from '@/types';
import { getMaxMinListLengths } from '@/utils/init-object-literals/genericGeneratorNodeFunctions/getMaxMinListLengths';

export type ValueListUnfolder<T> = {
  (valueList: ValueList<T>): T[];
};

export type DeAccumulationMap<T> = {
  // Must be able to return a suitable value when index is out of bounds for the length of the value list for key.
  [Property in keyof T]: (
    valueList: ValueList<T>,
    key: keyof T,
    index: number
  ) => T[Property];
};

export type DeAccumulationMode = 'minimumListLength' | 'maximumListLength';

export function getValueListDeAccumulationFunction<T>(
  deAccumulationMap: DeAccumulationMap<T>,
  deAccumulationMode: DeAccumulationMode
): ValueListUnfolder<T> {
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

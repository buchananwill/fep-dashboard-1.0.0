import { isNotUndefined } from '@/api/main';
import fastCartesian from 'fast-cartesian';
import { PartialValueList, ValueList } from '@/types';

export function crossProductFromValueList<T>(valueList: ValueList<T>): T[] {
  const keysThaHaveListItems: (keyof typeof valueList)[] = Object.keys(
    valueList
  )
    .filter((valueListKey) => {
      const valueListElement =
        valueList[valueListKey as keyof PartialValueList<T>];
      return valueListElement !== undefined && valueListElement.length > 0;
    })
    .map((keyItem) => keyItem as keyof typeof valueList);

  const valueListArray = keysThaHaveListItems
    .map((keyItem) => valueList[keyItem])
    .filter(isNotUndefined);

  const listProduct = fastCartesian(valueListArray as ValueList<T>[keyof T][]);
  return listProduct.map((list) => {
    return Object.fromEntries(
      keysThaHaveListItems.map((key, index) => [key, list[index]])
    ) as T;
  });
}

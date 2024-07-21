import {
  BinaryOperator,
  KeyArray,
  MonoFunction,
  PartialValueList
} from '@/types';
import { isNotUndefined } from '@/api/main';

export function getMergeObjectsFunction<T extends Object>(
  template: T,
  reconciliationMap: ReconciliationMap<T>
): BinaryOperator<T> {
  const getPresentKeys = getPresentKeysFunction(template);

  return function (a: T, b: T) {
    const setOfPresentKeys = new Set<keyof PartialValueList<T>>([
      ...getPresentKeys(a),
      ...getPresentKeys(b)
    ]);

    const reconciledList = [...setOfPresentKeys.values()].map((keyOfT) => {
      const reconciliationFunction = reconciliationMap[keyOfT];
      const value = reconciliationFunction(a[keyOfT], b[keyOfT]);
      return [keyOfT, value];
    });
    return Object.fromEntries(reconciledList);
  };
}

function getPresentKeysFunction<T extends Object>(
  template: T
): MonoFunction<Partial<T>, KeyArray<T>> {
  return function (object: Partial<T>) {
    return Object.keys(template)
      .filter((keyOfT) => isNotUndefined(object[keyOfT as keyof T]))
      .map((keyOfT) => keyOfT as keyof T);
  };
}

export type ReconciliationMap<ReferenceType> = {
  [Property in keyof ReferenceType]: BinaryOperator<ReferenceType[Property]>;
};

import { BinaryOperator, PartialValueList, ValueList } from '@/types';
import {
  getMergeObjectsFunction,
  ReconciliationMap
} from '@/utils/init-object-literals/genericGeneratorNodeFunctions/mergeObjects';

export function getMergeEntryLists<T>(
  template: ValueList<T>,
  reconciliationMap: ReconciliationMap<PartialValueList<T>>
): BinaryOperator<PartialValueList<T>> {
  const mergeObjectsFunction = getMergeObjectsFunction(
    template,
    reconciliationMap
  );

  return function (
    aValueList: PartialValueList<T>,
    bValueList: PartialValueList<T>
  ) {
    return mergeObjectsFunction(aValueList, bValueList);
  };
}

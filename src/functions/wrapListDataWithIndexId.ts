import { IdWrapper } from '@/api/types';
import { LabelMaker } from '@/hooks/select-adaptors/useLabelMaker';

export function wrapListDataWithIndexId<T>(dataList: T[]): IdWrapper<T>[] {
  return dataList.map((data, index) => ({ id: String(index), data }));
}
export function unWrapListDataWithIndexId<T>(dataList: IdWrapper<T>[]): T[] {
  return dataList.map((wrapper) => ({ ...wrapper.data }));
}

export function wrapDataWithLabelAsId<T>(
  data: T,
  labelMaker: LabelMaker<T>
): IdWrapper<T> {
  return { id: labelMaker(data), data };
}

export function wrapDataListWithLabelAsId<T>(
  dataList: T[],
  labelMaker: LabelMaker<T>
) {
  return dataList.map((t) => wrapDataWithLabelAsId(t, labelMaker));
}

export function unWrapDataWithId<T>(
  wrapper: IdWrapper<T>,
  _index?: number,
  _list?: IdWrapper<T>[]
): T {
  return { ...wrapper.data };
}

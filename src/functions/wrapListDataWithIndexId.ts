import { IdWrapper } from '@/api/types';

export function wrapListDataWithIndexId<T>(dataList: T[]): IdWrapper<T>[] {
  return dataList.map((data, index) => ({ id: String(index), data }));
}
export function unWrapListDataWithIndexId<T>(dataList: IdWrapper<T>[]): T[] {
  return dataList.map((wrapper) => ({ ...wrapper.data }));
}

export function unWrapDataWithId<T>(
  wrapper: IdWrapper<T>,
  _index?: number,
  _list?: IdWrapper<T>[]
): T {
  return { ...wrapper.data };
}

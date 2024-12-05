import { HasIdClass, IdWrapper } from '@/api/types';
import { Identifier } from 'dto-stores';
import { useCallback } from 'react';
import { isNotUndefined } from '@/api/main';
import { unWrapDataWithId } from '@/functions/wrapListDataWithIndexId';

export function useDataExportCallback<U extends Identifier = Identifier>({
  idList,
  type,
  readAnyDto
}: DataExportParams<U>) {
  return useCallback(() => {
    let dtoList;
    if (type === 'unwrap') {
      dtoList = idList
        .map((id) => readAnyDto(id))
        .filter(isNotUndefined)
        .map(unWrapDataWithId);
    } else {
      dtoList = idList.map((id) => readAnyDto(id)).filter(isNotUndefined);
    }
    return JSON.stringify(dtoList);
  }, [readAnyDto, idList, type]);
}

type DataExportRawParams<U extends Identifier = Identifier> = {
  type: 'raw';
  idList: U[];
  readAnyDto: (id: Identifier) => HasIdClass<U> | undefined;
};
type DataExportUnwrapParams = {
  type: 'unwrap';
  idList: string[];
  readAnyDto: (id: string) => IdWrapper<any> | undefined;
};

type DataExportParams<U extends Identifier> =
  | DataExportRawParams<U>
  | DataExportUnwrapParams;

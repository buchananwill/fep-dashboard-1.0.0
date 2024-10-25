import { HasIdClass } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { useCallback } from 'react';
import { get } from 'lodash';

export function useLabelMaker<T extends HasIdClass>(
  labelMaker?: (string & TypedPaths<T, string | number>) | ((item: T) => string)
): (item?: T) => string {
  return useCallback(
    (item?: T) => {
      if (item === undefined) throw Error('Item was undefined');
      let label = item.id;
      if (typeof labelMaker === 'string') {
        label = String(get(item, labelMaker));
      } else if (typeof labelMaker === 'function') {
        label = labelMaker(item);
      }
      return label as string;
    },
    [labelMaker]
  );
}
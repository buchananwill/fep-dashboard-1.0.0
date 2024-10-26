import { TypedPaths } from '@/api/custom-types/typePaths';
import { useCallback } from 'react';
import { get } from 'lodash';

export type LabelMakerParams<T> =
  | (string & TypedPaths<T, string | number>)
  | ((item: T) => string);

export function useLabelMaker<T>(
  labelMaker?: LabelMakerParams<T>
): LabelMaker<T> {
  return useCallback(
    (item?: T) => {
      if (item === undefined) throw Error('Item was undefined');
      let label = String(item);
      if (typeof labelMaker === 'string') {
        label = String(get(item, labelMaker));
      } else if (typeof labelMaker === 'function') {
        label = labelMaker(item);
      }
      return label;
    },
    [labelMaker]
  );
}

export type LabelMaker<T> = (item?: T) => string;

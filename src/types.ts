import { DtoUiArrayProps } from 'dto-stores';
import { HasId } from '@/api/types';

export type StringPropertyKey<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type uiWrapperListViewProps<T extends HasId, Props> = DtoUiArrayProps<
  T,
  Props
> & { entityList: T[] };

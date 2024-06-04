import { HasId } from '@/api/main';
import { DtoUiArrayProps } from 'dto-stores';

export type StringPropertyKey<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type uiWrapperListViewProps<T extends HasId, Props> = DtoUiArrayProps<
  T,
  Props
> & { entityList: T[] };

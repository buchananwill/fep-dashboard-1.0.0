import { DtoUiArrayProps } from 'dto-stores';
import { HasId } from '@/api/types';
import { Dispatch, SetStateAction } from 'react';

export type StringPropertyKey<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type uiWrapperListViewProps<T extends HasId, Props> = DtoUiArrayProps<
  T,
  Props
> & { entityList: T[] };

export type DispatchState<T> = Dispatch<SetStateAction<T>>;

export interface Column<T> {
  name: string;
  uid: Extract<keyof T, string | number>;
  sortable?: boolean;
}

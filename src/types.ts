import { DtoUiArrayProps } from 'dto-stores';
import { HasId } from '@/api/types';
import React, { Dispatch, SetStateAction } from 'react';
import { Selection } from '@nextui-org/react';

export type StringPropertyKey<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type NumberPropertyKey<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export type BooleanPropertyKey<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
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

export type NextUiSelection = Selection;
export type DispatchList<T> = React.Dispatch<React.SetStateAction<T[]>>;

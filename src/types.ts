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

export type KeyArray<T> = (keyof T)[];

export type DispatchState<T> = Dispatch<SetStateAction<T>>;

export interface Column<T> {
  name: string;
  uid: Extract<keyof T, string | number>;
  sortable?: boolean;
}

export type NextUiSelection = Selection;
export type DispatchList<T> = React.Dispatch<React.SetStateAction<T[]>>;

// Predicate<T>
// Represents a predicate (boolean-valued function) of one argument.
export interface Predicate<T> {
  (t: T): boolean;
}

// Function<T, R>
// Represents a function that accepts one argument and produces a result.
export interface MonoFunction<T, R> {
  (t: T): R;
}

// Consumer<T>
// Represents an operation that accepts a single input argument and returns no result.
export interface Consumer<T> {
  (t: T): void;
}

// Supplier<T>
// Represents a supplier of results.
export interface Supplier<T> {
  (): T;
}

// BiPredicate<T, U>
// Represents a predicate (boolean-valued function) of two arguments.
export interface BiPredicate<T, U> {
  (t: T, u: U): boolean;
}

// BiFunction<T, U, R>
// Represents a function that accepts two arguments and produces a result.
export interface BiFunction<T, U, R> {
  (t: T, u: U): R;
}

// BiConsumer<T, U>
// Represents an operation that accepts two input arguments and returns no result.
export interface BiConsumer<T, U> {
  (t: T, u: U): void;
}

// UnaryOperator<T>
// Represents an operation on a single operand that produces a result of the same type as its operand. It's a specialization of Function.
export type UnaryOperator<T> = MonoFunction<T, T>;

// BinaryOperator<T>
// Represents an operation upon two operands of the same type, producing a result of the same type as the operands. It's a specialization of BiFunction.
export type BinaryOperator<T> = BiFunction<T, T, T>;
export type ValueList<ReferenceType> = {
  [Property in keyof ReferenceType]: ReferenceType[Property][];
};
export type PartialValueList<T> = Partial<ValueList<T>>;

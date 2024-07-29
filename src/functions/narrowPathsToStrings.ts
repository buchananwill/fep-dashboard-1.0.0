import { Get, PartialDeep, Paths, Simplify } from 'type-fest';
import { NonRecursiveType } from 'type-fest/source/internal';
import { GetFieldType } from '@/functions/allowingNestedFiltering';
import { extendDefaultTheme } from '@nivo/core';
import { StringPropertyKey } from '@/types';

interface TestInterface {
  first: string;
  nested: {
    second: number;
    third: string;
    doubleNested: {
      fourth: string;
    };
  };
}

type PropertyTypes<TType> = {
  [Member in Extract<Paths<TType>, string>]: Get<TType, Member>;
};

type RetrievedType = Get<TestInterface, 'nested.third'>;

type TestPaths = Paths<TestInterface>;

type TestPathProperties = PropertyTypes<TestInterface>;

type TestPathStringProperties = StringPropertyKey<TestPathProperties>;

type SimplifiedTestPathProperties = Simplify<TestPathProperties>;

export type StringPaths<TType> = Extract<
  Paths<TType>,
  StringPropertyKey<PropertyTypes<TType>>
>;

type TestStringPaths = StringPaths<TestInterface>;

export type StringPath<TType, TPath extends string | string[]> =
  Get<TType, TPath> extends string ? string : never;

type StringPathsTest = Extract<TestPathProperties, string>;

const pathOfTest: TestPaths = 'nested.third';

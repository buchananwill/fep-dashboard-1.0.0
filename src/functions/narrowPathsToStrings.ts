import { Get, PartialDeep, Paths, Simplify } from 'type-fest';
import { NonRecursiveType } from 'type-fest/source/internal';
import { GetFieldType } from '@/functions/allowingNestedFiltering';
import { extendDefaultTheme } from '@nivo/core';
import { StringPropertyKey, TypePropertyKey } from '@/types';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema_';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { Example } from '@/functions/chatGptTriesToStringPath';
import { infer } from 'zod';

interface TestInterface {
  first: string;
  nested: {
    second: number;
    third: string;
    doubleNested: {
      fourth: number;
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

export type TypedPaths<TType, PType> =
  Paths<TType> extends infer P
    ? P extends string
      ? Get<TType, P> extends PType
        ? P
        : never
      : never
    : never;

export type MoreStringPaths<TType> =
  Paths<TType> extends infer P
    ? P extends string
      ? Get<TType, P> extends string | undefined
        ? P
        : never
      : never
    : never;

type MoreTestStringPaths = MoreStringPaths<TestInterface>;
type OrganizationStringPaths = MoreStringPaths<WorkProjectSeriesSchemaDto>;

type ExampleStringPaths = MoreStringPaths<Example>;

export type StringPath<TType, TPath extends string | string[]> =
  Get<TType, TPath> extends string ? string : never;

type StringPathsTest = Extract<TestPathProperties, string>;

const pathOfTest: TestPaths = 'nested.third';

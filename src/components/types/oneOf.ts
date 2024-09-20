import {
  NextUiCellComponent,
  NextUiCellComponentRecord
} from '@/components/tables/GetCellRenderFunction';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { StringValueChip } from '@/components/tables/StringValueChip';
import { EntityClassMap, EntityNameSpace } from '@/api/entity-class-map';
import { EntityTypeKey } from '@/components/tables/types';
import { EntityTypeMap } from '@/api/entity-type-map';
import React from 'react';
import { Paths } from 'type-fest';

type OnlyFirst<F, S> = F & { [Key in keyof Omit<S, keyof F>]?: never };

type MergeTypes<TypesArray extends any[], Output = {}> = TypesArray extends [
  infer Head,
  ...infer Rest
]
  ? MergeTypes<Rest, Output & Head>
  : Output;

type OneOf<
  TypesArray extends any[],
  Output = never,
  AllProperties = MergeTypes<TypesArray>
> = TypesArray extends [infer Head, ...infer Rest]
  ? OneOf<Rest, Output | OnlyFirst<Head, AllProperties>, AllProperties>
  : Output;

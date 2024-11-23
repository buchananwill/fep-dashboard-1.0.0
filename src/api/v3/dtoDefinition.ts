import { Entity } from 'dto-stores';
import { EntityTypeMap } from '@/api/entity-type-map';

type ValuesWithId<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Entity ? T[K] : never;
};

export type DtoDefinition = ValuesWithId<EntityTypeMap>;

export type DefinedDto = keyof DtoDefinition;

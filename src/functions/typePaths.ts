import { Get, Paths } from 'type-fest';

export type TypedPaths<TType, PType> =
  Paths<TType> extends infer P
    ? P extends string
      ? Get<TType, P> extends PType
        ? P
        : never
      : never
    : never;

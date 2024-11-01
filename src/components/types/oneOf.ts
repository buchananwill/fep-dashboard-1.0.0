type OnlyFirst<F, S> = F & { [Key in keyof Omit<S, keyof F>]?: never };

export type MergeTypes<
  TypesArray extends any[],
  Output = {}
> = TypesArray extends [infer Head, ...infer Rest]
  ? MergeTypes<Rest, Output & Head>
  : Output;

export type OneOf<
  TypesArray extends any[],
  Output = never,
  AllProperties = MergeTypes<TypesArray>
> = TypesArray extends [infer Head, ...infer Rest]
  ? OneOf<Rest, Output | OnlyFirst<Head, AllProperties>, AllProperties>
  : Output;

export type StringPropertyKey<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type Middleware<T, U> = (
  currentAction: (request: T) => U
) => (interceptedRequest: T) => U;

export function middlewareCombiner<T, U>(
  middlewareArguments: Middleware<T, U>[],
  baseAction: (request: T) => U
) {
  return middlewareArguments.reduce((prev, curr) => curr(prev), baseAction);
}

export function prewareCombiner<T, U>(
  middlewareArguments: Middleware<T, T>[],
  baseAction: (request: T) => U
) {
  return (v: T) =>
    baseAction(
      middlewareArguments.reduce(
        (prev, curr) => curr(prev),
        (v: T) => v
      )(v)
    );
}

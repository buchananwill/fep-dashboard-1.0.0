export type Middleware<T, U> = (
  currentAction: (request: T) => Promise<U>
) => (interceptedRequest: T) => Promise<U>;

export function middlewareCombiner<T, U>(
  middlewareArguments: Middleware<T, U>[],
  baseAction: (request: T) => Promise<U>
) {
  return middlewareArguments.reduce((prev, curr) => curr(prev), baseAction);
}

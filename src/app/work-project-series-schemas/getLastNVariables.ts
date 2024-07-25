export function getLastNVariables(pathVariables: string[], nDepth: number) {
  return pathVariables.slice(
    pathVariables.length - nDepth,
    pathVariables.length
  );
}

export function getFirstNVariables(pathVariables: string[], howMany: number) {
  return pathVariables.slice(0, howMany);
}

export function getRootCardLayoutId(pathVariables: string[]) {
  return '/' + getFirstNVariables(['core', ...pathVariables], 2).join('/');
}

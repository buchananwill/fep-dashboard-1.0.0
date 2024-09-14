import { kebabCase } from 'lodash';

export function getCoreEntityLink(
  matchedPaths: string[],
  variables?: (string | number)[]
) {
  return `/core/${matchedPaths.map(kebabCase).join('/')}${variables ? `/${variables.join('/')}` : ''}`;
}
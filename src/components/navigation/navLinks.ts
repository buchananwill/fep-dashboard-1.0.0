import { iconDefinitions } from '@/components/navigation/iconDefinitions';
import { kebabCase } from 'lodash';

export interface NavLinkList {
  [key: string]: string;
}

export const mainNavLinkList: NavLinkList = Object.keys(iconDefinitions)
  .map((key) => [key, `/core/${kebabCase(key)}`])
  .reduce((prev, [currKey, currValue]) => {
    prev[currKey] = currValue;
    return prev;
  }, {} as NavLinkList);

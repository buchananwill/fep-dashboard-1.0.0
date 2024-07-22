import { navLinkIcons } from '@/components/navigation/navLinkIcons';
import { kebabCase } from 'lodash';

export interface NavLinkList {
  [key: string]: string;
}

export const mainNavLinkList: NavLinkList = Object.keys(navLinkIcons)
  .map((key) => [key, kebabCase(key)])
  .reduce((prev, [currKey, currValue]) => {
    prev[currKey] = currValue;
    return prev;
  }, {} as NavLinkList);

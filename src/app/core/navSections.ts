import { kebabCase } from 'lodash';
import { navKeyList, navLinkIcons } from '@/components/navigation/navLinkIcons';
import { NavLinkList } from '@/components/navigation/navLinks';

export const coreNavSections: NavLinkList = Object.keys(navLinkIcons)
  .map((key) => [key, kebabCase(key)])
  .reduce((prev, [currKey, currValue]) => {
    prev[currKey] = currValue;
    return prev;
  }, {} as NavLinkList);

export const actionSections = { edit: 'edit', create: 'create' } as const;

export const subRouteOptions = [['edit', 'create', 'serviceCategoryId', 'id']];

export interface BaseNavParams {
  navSection: string;
  subRoutes: string[];
}

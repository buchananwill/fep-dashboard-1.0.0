import { createLinksFromNavTree } from '@/app/core/navigation/links/createLinksFromNavTree';
import { navTreeData } from '@/app/core/navigation/data/navTreeData';

export const linksFromNavTree = createLinksFromNavTree(
  navTreeData,
  ['core'],
  []
);
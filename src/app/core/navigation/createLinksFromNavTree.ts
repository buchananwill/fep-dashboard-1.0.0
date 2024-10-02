import { kebabCase, startCase } from 'lodash';
import {
  NavLinkTree,
  NavTreeBranch,
  NavTreeChildren
} from '@/app/core/navigation/types';

export function createLinksFromNavTree(
  tree: NavTreeBranch,
  ancestorPath: string[] = [],
  indexList: number[] = []
): NavLinkTree {
  const { displayName, link } = createLinkInfo(ancestorPath);
  const disableLinkThisLevel = link.length === 0 || !tree.component;
  const linksFromHere = tree.children
    ? getLinksFromHere(tree.children, ancestorPath, indexList)
    : [];
  return {
    displayName,
    link,
    children: linksFromHere,
    indexList,
    disableLinkThisLevel
  };
}
function createLinkInfo(ancestorPath: string[]) {
  const displayName = startCase(
    ancestorPath[ancestorPath.length - 1] || 'home'
  );
  const link = ancestorPath.map(kebabCase);
  return { displayName, link };
}
function getLinksFromHere(
  childNodes: NavTreeChildren,
  ancestorPath: string[],
  indexList: number[]
): NavLinkTree[] {
  return Object.entries(childNodes).map(([key, value], index) => {
    const pathToHere = [...ancestorPath, key];
    return createLinksFromNavTree(value, pathToHere, [...indexList, index + 1]);
  });
}

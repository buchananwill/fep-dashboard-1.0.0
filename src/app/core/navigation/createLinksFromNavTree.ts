import { kebabCase, startCase } from 'lodash';
import { NavLinkTree, NavTree, NavTreeNode } from '@/app/core/navigation/types';
import { getDomainAlias } from '@/api/getDomainAlias';

export function createLinksFromNavTree(
  tree: NavTreeNode,
  ancestorPath: string[],
  indexList: number[]
): NavLinkTree {
  const displayNameAlias = startCase(
    getDomainAlias(ancestorPath[ancestorPath.length - 1])
  );
  const displayName = startCase(ancestorPath[ancestorPath.length - 1]);
  console.log(displayName, displayNameAlias);
  if (tree.type === 'leaf') {
    return {
      link: ancestorPath.map(kebabCase),
      children: [],
      displayName,
      indexList
    };
  }
  if (tree.type === 'branch') {
    const childNodes = tree.children;
    const linksFromHere: NavLinkTree[] = getLinksFromHere(
      childNodes,
      ancestorPath,
      indexList
    );
    const { component } = tree;
    if (component) {
      return {
        link: ancestorPath.map(kebabCase),
        children: linksFromHere,
        displayName,
        indexList
      };
    } else {
      return { children: linksFromHere, displayName, indexList };
    }
  } else {
    const linksFromHere = getLinksFromHere(tree, ancestorPath, indexList);
    return { children: linksFromHere, displayName, indexList };
  }
}

function getLinksFromHere(
  childNodes: NavTree,
  ancestorPath: string[],
  indexList: number[]
) {
  return Object.entries(childNodes).map(([link, value], index) => {
    const pathToHere = [...ancestorPath, link];

    return createLinksFromNavTree(value, pathToHere, [...indexList, index + 1]);
  });
}

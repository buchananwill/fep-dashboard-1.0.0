import { kebabCase, startCase } from 'lodash';
import { NavLinkTree, NavTree, NavTreeNode } from '@/app/core/navigation/types';

export function createLinksFromNavTree(
  tree: NavTreeNode,
  ancestorPath: string[],
  indexList: number[]
): NavLinkTree {
  const displayName = startCase(ancestorPath[ancestorPath.length - 1]);
  const link = ancestorPath.map(kebabCase);
  const disableLinkThisLevel = link.length === 0;
  if (tree.type === 'leaf') {
    return {
      link: ancestorPath.map(kebabCase),
      children: [],
      displayName,
      indexList,
      disableLinkThisLevel
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
        link,
        children: linksFromHere,
        displayName,
        indexList,
        disableLinkThisLevel
      };
    } else {
      return {
        children: linksFromHere,
        displayName,
        indexList,
        link,
        disableLinkThisLevel
      };
    }
  } else {
    const linksFromHere = getLinksFromHere(tree, ancestorPath, indexList);
    return {
      children: linksFromHere,
      displayName,
      indexList,
      link,
      disableLinkThisLevel
    };
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

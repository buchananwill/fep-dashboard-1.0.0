import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import TestLeaf from '@/app/core/TestLeaf';
import { kebabCase } from 'lodash';
import { LinkButton, NoLinkHeader } from '@/app/service-categories/LinkButton';

export interface LeafComponentProps {
  pathVariables: string[];
  depth: number;
}

export type LeafComponent = (props: LeafComponentProps) => ReactNode;

export interface NavTree {
  [key: string]: NavTreeBranch | NavTreeLeaf;
}

export type NavTreeBranch = {
  type: 'branch';
  children: NavTreeNodes;
  component?: LeafComponent;
};

export type NavTreeLeaf = {
  type: 'leaf';
  component: LeafComponent;
};

export const homePage: NavTree = {
  testLeaf: { type: 'leaf', component: TestLeaf }
};

export type NavTreeNodes = NavTreeBranch | NavTreeLeaf | NavTree;

export interface NavLinkTree {
  displayName: string;
  link?: string[];
  indexList: number[];
  children: NavLinkTree[];
}

export function createLinksFromNavTree(
  tree: NavTreeNodes,
  ancestorPath: string[],
  indexList: number[]
): NavLinkTree {
  const displayName = ancestorPath[ancestorPath.length - 1];
  let linksFromHere: NavLinkTree[] = [];
  if (tree.type === 'leaf') {
    return {
      link: ancestorPath.map(kebabCase),
      children: [],
      displayName,
      indexList
    };
  }
  if (tree.type === 'branch') {
    Object.entries(tree.children).forEach(([link, value], index) => {
      const pathToHere = [...ancestorPath, link];
      linksFromHere.push(
        createLinksFromNavTree(value, pathToHere, [...indexList, index + 1])
      );
    });
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
    Object.entries(tree).forEach(([link, value], index) => {
      const pathToHere = [...ancestorPath, link];
      linksFromHere.push(
        createLinksFromNavTree(value, pathToHere, [...indexList, index + 1])
      );
    });
    return { children: linksFromHere, displayName, indexList };
  }
}

export interface LinkTreeElementProps {
  displayLabel: string | ReactElement;
}

type HeaderWithoutLink = (
  props: PropsWithChildren & LinkTreeElementProps
) => ReactNode;
type LinkWithChildLinks = (
  props: PropsWithChildren & { link: string[] } & LinkTreeElementProps
) => ReactNode;

export function NavLinkTreeButton({
  navLinkNode,
  renderLinkAs: LinkComponent,
  renderHeaderAs: HeaderComponent
}: {
  navLinkNode: NavLinkTree;
  renderHeaderAs: HeaderWithoutLink;
  renderLinkAs: LinkWithChildLinks;
}) {
  const { link, displayName, children, indexList } = navLinkNode;
  const DisplayLabelElement = (
    <>
      <span className={'mr-2 font-mono'}>{indexList.join('.')}</span>
      <span>{displayName}</span>
    </>
  );
  const childrenElements = children.map((navTreeLink, index) => (
    <NavLinkTreeButton
      navLinkNode={navTreeLink}
      renderLinkAs={LinkComponent}
      renderHeaderAs={HeaderComponent}
      key={`${navTreeLink.indexList.join('.')}`}
    />
  ));
  const DisplayThisLevel = link
    ? ({
        displayLabel,
        children
      }: LinkTreeElementProps & PropsWithChildren) => (
        <LinkComponent link={link} displayLabel={displayLabel}>
          {children}
        </LinkComponent>
      )
    : HeaderComponent;
  return (
    <DisplayThisLevel displayLabel={DisplayLabelElement}>
      {...childrenElements}
    </DisplayThisLevel>
  );
}

export function NavTreeLinkWrapper({
  children,
  label: LabelComponent
}: PropsWithChildren & { label: ReactElement }) {
  return (
    <div className={'flex flex-col'}>
      {LabelComponent}
      <div className={'ml-4'}>{children}</div>
    </div>
  );
}

export function LinkButtonWithChildLinks({
  link,
  displayLabel
}: {
  link: string[];
} & LinkTreeElementProps) {
  const joinedLink = link.join('/');
  return <LinkButton href={`/${joinedLink}`}>{displayLabel}</LinkButton>;
}

export function WrappedLink({
  link,
  displayLabel,
  children
}: PropsWithChildren & { link: string[] } & LinkTreeElementProps) {
  return (
    <NavTreeLinkWrapper
      label={
        <LinkButtonWithChildLinks link={link} displayLabel={displayLabel} />
      }
    >
      {children}
    </NavTreeLinkWrapper>
  );
}

export function WrappedHeader({
  children,
  displayLabel
}: PropsWithChildren & LinkTreeElementProps) {
  return (
    <NavTreeLinkWrapper label={<NoLinkHeader displayLabel={displayLabel} />}>
      {children}
    </NavTreeLinkWrapper>
  );
}

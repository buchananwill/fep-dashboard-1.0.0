import { PropsWithChildren } from 'react';
import {
  HeaderWithoutLink,
  LinkTreeElementProps,
  LinkWithChildLinks,
  NavLinkTree
} from '@/app/core/navigation/types';

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
      <span className={'mr-2 font-mono'}>
        {indexList.join('.')}
        {indexList.length > 0 ? ':' : ''}
      </span>
      <span>{displayName}</span>
    </>
  );
  const childrenElements = children.map((navTreeLink) => (
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

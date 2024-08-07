import { PropsWithChildren } from 'react';
import {
  HeaderWithoutLink,
  LinkTreeElementProps,
  LinkWithChildLinks,
  NavLinkTree
} from '@/app/core/navigation/types';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import {
  NavigationType,
  navLinkIcons
} from '@/components/navigation/navLinkIcons';
import { camelCase } from 'lodash';

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
      {
        <>
          <span className={'mr-2 font-mono'}>{indexList.join('.')}:</span>
          <span>{displayName}</span>
        </>
      }
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
  switch (indexList.length) {
    case 0:
      return <>{...childrenElements}</>;
    case 1: {
      const Icon = navLinkIcons[camelCase(displayName) as NavigationType];
      return (
        <Card>
          <CardHeader className={'flex gap-2'}>
            <Icon className={'h-8 w-8'} />
            {displayName}
          </CardHeader>
          <CardBody>
            <DisplayThisLevel displayLabel={DisplayLabelElement}>
              {...childrenElements}
            </DisplayThisLevel>
          </CardBody>
        </Card>
      );
    }
    default:
      return (
        <DisplayThisLevel displayLabel={DisplayLabelElement}>
          {...childrenElements}
        </DisplayThisLevel>
      );
  }
}

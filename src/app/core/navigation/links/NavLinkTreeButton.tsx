import { PropsWithChildren } from 'react';
import {
  HeaderWithoutLink,
  LinkTreeElementProps,
  LinkWithChildLinks,
  NavLinkTree
} from '@/app/core/navigation/links/types';
import { NavigationType } from '@/components/navigation/iconDefinitions';
import { camelCase, startCase } from 'lodash';
import { getDomainAlias } from '@/api/getDomainAlias';
import RootCard from '@/components/generic/RootCard';
import { Card } from '@mantine/core';

export function NavLinkTreeButton({
  navLinkNode,
  renderLinkAs: LinkComponent,
  renderHeaderAs: HeaderComponent
}: {
  navLinkNode: NavLinkTree;
  renderHeaderAs: HeaderWithoutLink;
  renderLinkAs: LinkWithChildLinks;
}) {
  const { link, displayName, children, indexList, disableLinkThisLevel } =
    navLinkNode;
  const aliasName = startCase(getDomainAlias(displayName));

  const DisplayLabelElement = (
    <>
      {
        <>
          <span className={'mr-2 font-mono'}>{indexList.join('.')}:</span>
          <span>{aliasName}</span>
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
  const DisplayThisLevel =
    link.length > 0 && !disableLinkThisLevel
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
      const navKey = camelCase(displayName) as NavigationType;
      return (
        <RootCard
          layoutId={'/' + link.join('/')}
          displayHeader={aliasName}
          navigationType={navKey}
        >
          <div className={'p-2 pt-0'}>
            <DisplayThisLevel displayLabel={DisplayLabelElement}>
              {...childrenElements}
            </DisplayThisLevel>
          </div>
        </RootCard>
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

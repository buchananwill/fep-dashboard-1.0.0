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
import { camelCase, startCase } from 'lodash';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { NavLinkDescriptionsDefault } from '@/components/navigation/navLinkDescriptions';
import { getDomainAlias } from '@/api/getDomainAlias';

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
      const navKey = camelCase(displayName) as NavigationType;
      const Icon = navLinkIcons[navKey];
      return (
        <Card>
          <Popover triggerScaleOnOpen={false}>
            <PopoverTrigger>
              <Button
                variant={'light'}
                className={'rounded-none italic text-default-500'}
              >
                <CardHeader
                  className={'flex justify-between  border-default-200 '}
                >
                  <Icon className={'h-8 w-8'} />
                  {aliasName}
                </CardHeader>
              </Button>
            </PopoverTrigger>
            <PopoverContent className={'max-w-lg'}>
              {NavLinkDescriptionsDefault[navKey]}
            </PopoverContent>
          </Popover>
          <CardBody className={'pt-0'}>
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

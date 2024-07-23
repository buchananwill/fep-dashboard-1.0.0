import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { navKeyList, navLinkIcons } from '@/components/navigation/navLinkIcons';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { startCase } from 'lodash';
import { mainNavLinkList } from '@/components/navigation/navLinks';
import { navTreeData } from '@/app/core/[[...pathVariables]]/navTreeData';
import { createLinksFromNavTree } from '@/app/core/navigation/createLinksFromNavTree';
import { NavLinkTreeButton } from '@/app/core/navigation/NavLinkTreeButton';
import { WrappedLink } from '@/app/core/navigation/WrappedLink';
import { WrappedHeader } from '@/app/core/navigation/WrappedHeader';

export default function Home() {
  const linksFromNavTree = createLinksFromNavTree(navTreeData, ['core'], []);

  console.log(linksFromNavTree);

  return (
    <div className={' p-4'}>
      <Card className={'center-all-margin w-fit'}>
        {' '}
        <CardHeader>Navigation Links</CardHeader>{' '}
        <CardBody className={'grid w-fit grid-cols-3'}>
          {' '}
          {navKeyList.map((key) => {
            const rotate = key === 'workSchemaNodeAssignments';
            const Icon = navLinkIcons[key];
            const label = startCase(key);

            return (
              <LinkButton key={key} href={mainNavLinkList[key]}>
                <div className={'flex items-center gap-2 align-middle'}>
                  <Icon className={'h-8 w-8 text-black'} />
                  {label}
                </div>
              </LinkButton>
            );
          })}
        </CardBody>
      </Card>
      <Card>
        <NavLinkTreeButton
          navLinkNode={linksFromNavTree}
          renderHeaderAs={WrappedHeader}
          renderLinkAs={WrappedLink}
        />
      </Card>
    </div>
  );
}

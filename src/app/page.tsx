import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { navKeyList, navLinkIcons } from '@/components/navigation/navLinkIcons';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { startCase } from 'lodash';
import { mainNavLinkList } from '@/components/navigation/navLinks';

export default function Home() {
  return (
    <div className={'h-[100vh] w-[100vw] p-4'}>
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
    </div>
  );
}

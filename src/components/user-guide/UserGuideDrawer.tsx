'use client';
import { Affix, Button, Drawer, Title } from '@mantine/core';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useDisclosure } from '@mantine/hooks';
import { GenericNestedDto } from '@/api/generated-types/generated-types';
import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';
import Link from 'next/link';
import { UserGuideContents } from '@/components/user-guide/UserGuideContents';

export function UserGuideDrawer({
  nestedMarkdown
}: {
  nestedMarkdown: GenericNestedDto<UserGuideMarkdown>[];
}) {
  const [opened, { open, close, toggle }] = useDisclosure();

  return (
    <Affix position={{ bottom: 20, left: 20 }}>
      <Button color={'primary'} onClick={toggle}>
        <Bars3Icon width={40} />
      </Button>
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Link href={'#contents'}>
            <Title
              order={2}
              classNames={{
                root: 'duration-250 transition-colors-opacity inline h-fit w-fit rounded-xl bg-transparent p-2 text-blue-500 outline-offset-2 hover:bg-blue-100/50'
              }}
            >
              User Guide
            </Title>
          </Link>
        }
      >
        <UserGuideContents nestedMarkdown={nestedMarkdown} />
      </Drawer>
    </Affix>
  );
}

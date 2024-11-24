'use client';
import { Affix, Button, Drawer, List } from '@mantine/core';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useDisclosure } from '@mantine/hooks';
import { GenericNestedDto } from '@/api/generated-types/generated-types';
import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';
import { LinkButton } from '@/components/navigation/LinkButton';
import { startCase } from 'lodash';

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
      <Drawer opened={opened} onClose={close}>
        <List listStyleType={'none'}>
          {nestedMarkdown.map((root) => (
            <List.Item key={root.data.htmlId}>
              <IdLinksFromNestedMarkdown nestedMarkdownBlock={root} />
            </List.Item>
          ))}
        </List>
      </Drawer>
    </Affix>
  );
}

function IdLinksFromNestedMarkdown({
  nestedMarkdownBlock: { data, children }
}: {
  nestedMarkdownBlock: GenericNestedDto<UserGuideMarkdown>;
}) {
  return (
    <>
      <LinkButton href={`#${data.htmlId}`}>{startCase(data.htmlId)}</LinkButton>
      {children?.length > 0 && (
        <List ml={20} listStyleType={'inherit'}>
          {children.map((child) => (
            <List.Item key={child.data.htmlId}>
              {<IdLinksFromNestedMarkdown nestedMarkdownBlock={child} />}
            </List.Item>
          ))}
        </List>
      )}
    </>
  );
}

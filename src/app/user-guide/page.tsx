import { Api } from '@/api/clientApi';
import { Card, Title } from '@mantine/core';

import { MarkdownFromNestedBlock } from '@/components/user-guide/markdownFromNestedBlock';
import { UserGuideDrawer } from '@/components/user-guide/UserGuideDrawer';
import { UserGuideContents } from '@/components/user-guide/UserGuideContents';
import { ScrollToTop } from '@/components/generic/ScrollToTop';

const collator = new Intl.Collator();

export default async function Page() {
  // const userGuideMarkdowns = await Api.UserGuideMarkdown.getAll();
  const nestedBlocks = await Api.UserGuideMarkdown.getByNestedEntityList();

  return (
    <Card
      m={'md'}
      styles={{
        root: {
          display: 'flex',
          flexDirection: 'column',
          rowGap: 'var(--mantine-spacing-sm)',
          maxWidth: 'var(--mantine-breakpoint-lg)'
        }
      }}
    >
      <div className={'flex flex-col self-center'}>
        <Title order={1} id={'contents'}>
          Table of Contents
        </Title>
        <Card>
          <UserGuideContents nestedMarkdown={nestedBlocks} />
        </Card>
      </div>
      {nestedBlocks
        .sort((a, b) => {
          return a.data.level === b.data.level && a.data.level === 1
            ? collator.compare(a.data.htmlId, b.data.htmlId)
            : a.data.blockPosition - b.data.blockPosition;
        })
        .map((block) => (
          <MarkdownFromNestedBlock
            nestedBlock={block}
            key={block.data.htmlId}
          />
        ))}
      <UserGuideDrawer nestedMarkdown={nestedBlocks} />
      <ScrollToTop />
    </Card>
  );
}

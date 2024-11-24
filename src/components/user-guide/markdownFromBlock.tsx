import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';
import { List, Title, TitleOrder } from '@mantine/core';
import { startCase } from 'lodash';
import { EntityIcon } from '@/components/navigation/EntityIcon';
import Markdown from 'markdown-to-jsx';
import clsx from 'clsx';
import { LinkButton } from '@/components/navigation/LinkButton';

export function MarkdownFromBlock({
  block,
  fullPath,
  openTab = true
}: {
  block: UserGuideMarkdown;
  fullPath?: boolean;
  openTab?: boolean;
}) {
  const aOverrides = fullPath && openTab ? { target: '_blank' } : {};

  return (
    <div>
      <Title
        order={(block.level + 1) as TitleOrder}
        id={block.htmlId}
        fw={400}
        styles={{
          root: {
            textDecoration: 'underline solid var(--mantine-color-primary-3)',
            display: 'flex',
            flexDirection: 'row',
            columnGap: '0.5rem',
            alignItems: 'end'
          }
        }}
      >
        {startCase(block.htmlId)}

        <EntityIcon
          width={32}
          className={'inline-block'}
          entityName={block.htmlId}
        />
      </Title>
      {block.content && (
        <Markdown
          options={{
            overrides: {
              ol: (props) => <List {...props} type={'ordered'} withPadding />,
              ul: (props) => <List {...props} withPadding />,
              li: List.Item,
              a: ({ href, ...props }) => (
                <LinkButton
                  href={
                    fullPath && href?.startsWith('#')
                      ? `/user-guide${href}`
                      : href
                  }
                  {...props}
                  {...aOverrides}
                  className={clsx(
                    'duration-250 transition-colors-opacity relative z-10 -m-2 inline h-fit w-fit rounded-xl bg-transparent p-2 text-blue-500 outline-offset-2 hover:bg-blue-100/50'
                  )}
                />
              )
            }
          }}
        >
          {block.content}
        </Markdown>
      )}
    </div>
  );
}

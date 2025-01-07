import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';
import { List, Title, TitleOrder } from '@mantine/core';
import { startCase } from 'lodash';
import { EntityIcon } from '@/components/navigation/EntityIcon';
import Markdown from 'markdown-to-jsx';
import { LinkButton } from '@/components/navigation/LinkButton';
import { plural } from 'pluralize';
import classes from './markdownBlock.module.css';

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
        classNames={{ root: classes.titleRoot }}
      >
        {startCase(block.htmlId)}

        <EntityIcon
          width={32}
          className={'inline-block'}
          entityName={plural(block.htmlId)}
        />
      </Title>
      {block.content && (
        <Markdown
          options={{
            overrides: {
              ol: (props) => (
                <List {...props} type={'ordered'} ml={'xs'} withPadding />
              ),
              ul: (props) => <List {...props} withPadding ml={'xs'} />,
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
                  className={classes.linkButton}
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

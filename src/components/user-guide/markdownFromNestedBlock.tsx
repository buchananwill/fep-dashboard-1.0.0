import { GenericNestedDto } from '@/api/generated-types/generated-types';
import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';
import { PropsWithChildren } from 'react';
import { Paper } from '@mantine/core';
import { MarkdownFromBlock } from '@/components/user-guide/markdownFromBlock';

export function MarkdownFromNestedBlock({
  nestedBlock: { data, children }
}: {
  nestedBlock: GenericNestedDto<UserGuideMarkdown>;
}) {
  const content = <MarkdownFromBlock block={data} />;
  const Wrapper = (props: PropsWithChildren) =>
    data.level === 1 ? (
      <Paper
        {...props}
        shadow={'xs'}
        withBorder
        p={'md'}
        styles={{
          root: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 'var(--mantine-spacing-sm)'
          }
        }}
      />
    ) : (
      <>{props.children}</>
    );

  return (
    <Wrapper>
      {content}
      {children?.length > 0 &&
        children.map((childNestedBlock) => (
          <MarkdownFromNestedBlock
            nestedBlock={childNestedBlock}
            key={childNestedBlock.data.htmlId}
          />
        ))}
    </Wrapper>
  );
}

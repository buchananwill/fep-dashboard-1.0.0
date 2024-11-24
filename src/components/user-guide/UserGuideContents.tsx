'use client';
import { GenericNestedDto } from '@/api/generated-types/generated-types';
import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';
import { List } from '@mantine/core';
import { LinkButton } from '@/components/navigation/LinkButton';
import { startCase } from 'lodash';

export function UserGuideContents({
  nestedMarkdown
}: {
  nestedMarkdown: GenericNestedDto<UserGuideMarkdown>[];
}) {
  return (
    <List listStyleType={'none'}>
      {nestedMarkdown.map((root) => (
        <List.Item key={root.data.htmlId}>
          <IdLinksFromNestedMarkdown nestedMarkdownBlock={root} />
        </List.Item>
      ))}
    </List>
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

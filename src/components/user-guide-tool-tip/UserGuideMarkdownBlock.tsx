import { Api } from '@/api/clientApi';
import Markdown from 'markdown-to-jsx';
import { userGuideMarkdownToMarkdownString } from '@/app/user-guide/parseJsonTreeToMarkdown';

export async function UserGuideMarkdownBlock({ htmlId }: { htmlId: string }) {
  const [markdownBlock] = await Api.UserGuideMarkdown.getDtoListByExampleList([
    { htmlId }
  ]);
  if (markdownBlock === undefined) return null;

  return (
    <Markdown>{userGuideMarkdownToMarkdownString(markdownBlock)}</Markdown>
  );
}

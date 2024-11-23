import { NestedMarkdownBlock } from '@/app/user-guide/parseMarkdownToTree';
import { flattenNestedEntity } from '../../functions/flattenNestedEntity';
import { startCase } from 'lodash';

export function parseJsonTreeToMarkdown(asJson: NestedMarkdownBlock[]) {
  return asJson
    .flatMap(flattenNestedEntity)
    .sort((b1, b2) => b1.position - b2.position)
    .map(
      (b) =>
        `${'#'.repeat(Math.max(b.level, 0))} ${startCase(b.html_id)}${b.content}`
    )
    .reduce((s1, s2) => `${s1}${s2}`);
}

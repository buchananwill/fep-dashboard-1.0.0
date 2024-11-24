import {
  NestedMarkdownBlock,
  UserGuideMarkdown
} from '@/app/user-guide/parseMarkdownToTree';
import { flattenNestedEntity } from '../../functions/flattenNestedEntity';
import { startCase } from 'lodash';

export function userGuideMarkdownToMarkdownString(b: UserGuideMarkdown) {
  return `${'#'.repeat(Math.max(b.level, 0))} ${startCase(b.htmlId)}${b.content}`;
}

export function parseJsonTreeToMarkdown(asJson: NestedMarkdownBlock[]) {
  return parseUserGuideBlocksToMarkdown(asJson.flatMap(flattenNestedEntity));
}

export function parseUserGuideBlocksToMarkdown(blocks: UserGuideMarkdown[]) {
  return blocks
    .sort((b1, b2) => b1.blockPosition - b2.blockPosition)
    .map((b) => userGuideMarkdownToMarkdownString(b))
    .reduce((s1, s2) => `${s1}${s2}`);
}

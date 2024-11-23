import * as fs from 'fs';
import { readFileSync } from 'fs';
import path from 'path';
import {
  NestedMarkdownBlock,
  parseMarkdownToTree
} from './parseMarkdownToTree';

import asJson from '../../../user-guide-json-form.json';
import { GenericNestedDto } from '@/api/generated-types/generated-types';
import { startCase } from 'lodash';

const markdownContent = readFileSync(
  path.resolve(process.cwd(), 'src/app/user-guide/FEP-data-models.md'),
  'utf8'
);

fs.writeFileSync(
  './user-guide-json-form.json',
  JSON.stringify(parseMarkdownToTree(markdownContent))
);

function flattenNestedEntity<T>(asNested: GenericNestedDto<T>): T[] {
  return [asNested.data, ...asNested.children.flatMap(flattenNestedEntity)];
}

function parseJsonTreeToMarkdown(asJson: NestedMarkdownBlock[]) {
  return asJson
    .flatMap(flattenNestedEntity)
    .sort((b1, b2) => b1.position - b2.position)
    .map(
      (b) =>
        `${'#'.repeat(Math.max(b.level, 0))} ${startCase(b.html_id)}${b.content}`
    )
    .reduce((s1, s2) => `${s1}${s2}`);
}

fs.writeFileSync(
  './user-guide-markdown-recreated.md',
  parseJsonTreeToMarkdown(asJson)
);

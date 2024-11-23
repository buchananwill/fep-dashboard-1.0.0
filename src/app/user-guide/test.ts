import * as fs from 'fs';
import { readFileSync } from 'fs';
import path from 'path';
import { parseMarkdownToTree } from './parseMarkdownToTree';
import { parseJsonTreeToMarkdown } from './parseJsonTreeToMarkdown';
import asJson from '../../../user-guide-json-form.json';

const markdownContent = readFileSync(
  path.resolve(process.cwd(), 'src/app/user-guide/FEP-data-models.md'),
  'utf8'
);

fs.writeFileSync(
  './user-guide-json-form.json',
  JSON.stringify(parseMarkdownToTree(markdownContent))
);

fs.writeFileSync(
  './user-guide-markdown-recreated.md',
  parseJsonTreeToMarkdown(asJson)
);

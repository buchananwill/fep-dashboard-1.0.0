'use server';
import { readFileSync } from 'fs';
import path from 'path';
import { parseMarkdownToTree } from './parseMarkdownToTree';

export async function getUserGuide() {
  const markdownContent = readFileSync(
    path.resolve(process.cwd(), 'src/app/user-guide/FEP-User-Guide.md'),
    'utf8'
  );
  return JSON.stringify(parseMarkdownToTree(markdownContent));
}

// fs.writeFileSync(
//   './user-guide-json-form.json',
//   JSON.stringify(parseMarkdownToTree(markdownContent))
// );

// fs.writeFileSync(
//   './user-guide-markdown-recreated.md',
//   parseJsonTreeToMarkdown(asJson)
// );

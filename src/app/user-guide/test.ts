import { DomTreeSketch } from './DomTreeSketch';
import * as fs from 'fs';
import { compiler } from 'markdown-to-jsx';
// import guide from './FEP-data-models.md';

function parseDataModelNames({ childComponents }: DomTreeSketch): string[] {
  const response: string[] = [];
  if (childComponents) {
    Object.entries(childComponents).map(([key, value]) => {
      response.push(key);
      response.push(...parseDataModelNames(value));
    });
  }
  return response;
}

import { readFileSync } from 'fs';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';

const markdownContent = readFileSync(
  path.resolve(process.cwd(), 'src/app/user-guide/FEP-data-models.md'),
  'utf8'
);

fs.writeFileSync(
  './data-model-names.jsx',
  renderToStaticMarkup(compiler(markdownContent))
);

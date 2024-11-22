import { DomTreeSketch } from './DomTreeSketch';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import { compiler } from 'markdown-to-jsx';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';

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

const markdownContent = readFileSync(
  path.resolve(process.cwd(), 'src/app/user-guide/FEP-data-models.md'),
  'utf8'
);

const getCounter = () => {
  let counter = 0;
  return () => {
    return counter++;
  };
};

const idCounter = getCounter();
const blockCounter = getCounter();

type MarkdownBlock = {
  id: number;
  html_id: string;
  content: string;
  position: number;
  level: number;
  title: string;
};

type NestedMarkdownBlock = {
  data: MarkdownBlock;
  children: NestedMarkdownBlock[];
};

function createHtmlId(text: string) {
  return text.replace(/\s+/g, '-').toLowerCase();
}

const parseMarkdownToTree = (markdown: string) => {
  const lines = markdown.split('\n');
  const tree: NestedMarkdownBlock[] = [];
  const parents: NestedMarkdownBlock[] = []; // Stack of parent nodes
  let prev: NestedMarkdownBlock | null = null;

  lines.forEach((line, index) => {
    const isHeading = line.startsWith('#');

    if (isHeading) {
      let header = '';
      let tail = line;
      while (tail.startsWith('#')) {
        header = header + tail.slice(0, 1);
        tail = tail.slice(1);
      }
      const level = header.length; // Number of `#` marks
      const title = tail.trim(); // Title of the block
      const id = blockCounter();

      // Build the block object
      const block: NestedMarkdownBlock = {
        data: {
          id: id, // Temporary ordinal ID based on position
          level,
          title,
          content: line, // Content is initially just the header line.
          position: id,
          html_id: createHtmlId(title)
        },
        children: []
      };

      // Handle hierarchy
      if (prev !== null && level > prev.data.level) {
        // New child
        if (prev) {
          prev.children.push(block);
          parents.push(prev);
        }
      } else if (prev !== null && level === prev.data.level) {
        // Sibling
        const parent = parents[parents.length - 1];
        parent ? parent.children.push(block) : tree.push(block);
      } else {
        // New parent or backtrack
        while (
          parents.length &&
          parents[parents.length - 1].data.level >= level
        ) {
          parents.pop();
        }
        const parent = parents[parents.length - 1];
        parent ? parent.children.push(block) : tree.push(block);
      }

      // Set current block as previous
      prev = block;
    } else if (prev) {
      // Append non-heading lines to the content of the current block
      prev.data.content += line + '\n';
    }
  });

  return tree;
};

fs.writeFileSync(
  './user-guide-json-form.json',
  JSON.stringify(parseMarkdownToTree(markdownContent))
);

import { GenericNestedDto } from '@/api/generated-types/generated-types_';

const getCounter = () => {
  let counter = 0;
  return () => {
    return counter++;
  };
};
const idCounter = getCounter();
const blockCounter = getCounter();
export type UserGuideMarkdown = {
  id: number;
  htmlId: string;
  content: string | null;
  blockPosition: number;
  level: number;
};
export type NestedMarkdownBlock = GenericNestedDto<UserGuideMarkdown>;

function createHtmlId(text: string) {
  return text.replace(/\s+/g, '-').toLowerCase();
}

export const parseMarkdownToTree = (markdown: string) => {
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
          content: null, // Content is initially empty, as we will prefix the header from the html id and level.
          blockPosition: id,
          htmlId: createHtmlId(title)
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
      const prevContent = prev.data.content;
      prev.data.content =
        prevContent === null ? '\n' + line : prevContent + '\n' + line;
    }
  });

  return tree;
};

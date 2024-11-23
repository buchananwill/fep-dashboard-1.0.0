import { DomTreeSketch } from '@/app/user-guide/DomTreeSketch';

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
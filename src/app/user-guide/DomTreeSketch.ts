import { CSSProperties, ReactNode } from 'react';

export type DomTreeSketch = {
  component: Partial<{
    styles: Partial<{
      title: CSSProperties;
      card: CSSProperties;
      children: CSSProperties;
    }>;
    content: ReactNode;
  }>;
  childComponents?: Record<string, DomTreeSketch>;
};

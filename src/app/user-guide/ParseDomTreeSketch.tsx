import { Card } from '@mantine/core';
import { startCase } from 'lodash';

import { DomTreeSketch } from '@/app/user-guide/DomTreeSketch';

export function ParseDomTreeSketch({
  node: { component, childComponents },
  title,
  path
}: {
  node: DomTreeSketch;
  title?: string;
  path: string;
}) {
  const splitPath = path.split('/');
  const depth = splitPath.length;
  const { styles, content } = component;
  const childComponentsRendered = childComponents
    ? Object.entries(childComponents).map(([key, value], index) => {
        return (
          <ParseDomTreeSketch
            node={value}
            title={key}
            key={key}
            path={`${path}/${key}`}
          />
        );
      })
    : undefined;
  return (
    <Card styles={{ root: styles?.card }}>
      <h1 style={styles?.title}>{startCase(title)}</h1>
      {content && content}
      {childComponentsRendered ? (
        <div style={styles?.children}>{...childComponentsRendered}</div>
      ) : null}
    </Card>
  );
}

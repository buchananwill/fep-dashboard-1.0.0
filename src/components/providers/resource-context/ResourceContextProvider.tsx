'use client';
import { PropsWithChildren, useContext } from 'react';
import { ResourcePathContext } from '@/components/providers/resource-context/resource-context-creator';

export default function ResourceContextProvider({
  pathSegment,
  children
}: { pathSegment: string } & PropsWithChildren) {
  let pathList = useContext(ResourcePathContext);
  return (
    <ResourcePathContext.Provider value={[...pathList, pathSegment]}>
      {children}
    </ResourcePathContext.Provider>
  );
}

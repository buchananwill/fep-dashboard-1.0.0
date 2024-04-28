import { PropsWithChildren } from 'react';
import ResourceContextProvider from '@/components/providers/resource-context/ResourceContextProvider';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ResourceContextProvider pathSegment={'service-categories'}>
      <main>{children}</main>
    </ResourceContextProvider>
  );
}

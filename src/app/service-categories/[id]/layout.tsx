import { PropsWithChildren } from 'react';
import ResourceContextProvider from '@/components/providers/resource-context/ResourceContextProvider';
import { useParams } from 'next/navigation';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ResourceContextProvider pathSegment={'service-categories'}>
      {children}
    </ResourceContextProvider>
  );
}

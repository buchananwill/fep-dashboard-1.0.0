'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SelectiveContextManagerGlobal } from 'selective-context';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AnimationSyncContextProvider from '@/components/providers/animate-sync-context/AnimationSyncContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function LibraryProvidersWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <SelectiveContextManagerGlobal>
        <DndProvider backend={HTML5Backend}>
          <AnimationSyncContextProvider>
            <NextUIProvider locale={'en-GB'} navigate={router.push}>
              {children}
            </NextUIProvider>
          </AnimationSyncContextProvider>
        </DndProvider>
      </SelectiveContextManagerGlobal>
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient();

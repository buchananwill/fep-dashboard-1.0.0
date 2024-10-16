'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SelectiveContextManagerGlobal } from 'selective-context';
import React from 'react';
import AnimationSyncContextProvider from '@/components/providers/animate-sync-context/AnimationSyncContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

export function LibraryProvidersWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <SelectiveContextManagerGlobal>
        <DndProvider options={HTML5toTouch}>
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

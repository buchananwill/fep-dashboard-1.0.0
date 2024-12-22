'use client';

import { SelectiveContextManagerGlobal } from 'selective-context';
import React from 'react';
import AnimationSyncContextProvider from '@/components/providers/animate-sync-context/AnimationSyncContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { MantineProvider } from '@mantine/core';
import { defaultTheme } from '@/components/mantine/theme';

export function LibraryProvidersWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider {...providerProps}>
      <QueryClientProvider client={queryClient}>
        <SelectiveContextManagerGlobal>
          <DndProvider options={HTML5toTouch}>
            <AnimationSyncContextProvider>
              {children}
            </AnimationSyncContextProvider>
          </DndProvider>
        </SelectiveContextManagerGlobal>
      </QueryClientProvider>
    </MantineProvider>
  );
}

const queryClient = new QueryClient();

const providerProps = {
  theme: defaultTheme,

  cssVariablesSelector: `:root${':not(#\\#)'.repeat(3)}`
};

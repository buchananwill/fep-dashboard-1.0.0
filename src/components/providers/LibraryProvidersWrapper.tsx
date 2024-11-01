'use client';

import { useRouter } from 'next/navigation';
import { SelectiveContextManagerGlobal } from 'selective-context';
import React from 'react';
import AnimationSyncContextProvider from '@/components/providers/animate-sync-context/AnimationSyncContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';

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
            <MantineProvider theme={MantineTheme}>{children}</MantineProvider>
          </AnimationSyncContextProvider>
        </DndProvider>
      </SelectiveContextManagerGlobal>
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient();

const MantineTheme: MantineThemeOverride = {
  defaultRadius: 'lg',
  components: {
    Card: {
      defaultProps: { shadow: 'md' }
    },
    Popover: {
      defaultProps: { shadow: 'md' }
    }
  }
};

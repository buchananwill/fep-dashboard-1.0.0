'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SelectiveContextManagerGlobal } from 'selective-context';
import React from 'react';

import { MasterChangesTrackWrapper } from '@/components/generic/MasterChangesTrackerWrapper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AnimationSyncContextProvider from '@/components/providers/animate-sync-context/AnimationSyncContextProvider';

export function LibraryProvidersWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <SelectiveContextManagerGlobal>
      <MasterChangesTrackWrapper />
      <DndProvider backend={HTML5Backend}>
        <AnimationSyncContextProvider>
          <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        </AnimationSyncContextProvider>
      </DndProvider>
    </SelectiveContextManagerGlobal>
  );
}

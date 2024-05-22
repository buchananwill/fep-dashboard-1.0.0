'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SelectiveContextManagerGlobal } from 'selective-context';
import React from 'react';

import { MasterChangesTrackWrapper } from '@/components/generic/DtoChangesTracker';

export function LibraryProvidersWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <SelectiveContextManagerGlobal>
      <MasterChangesTrackWrapper />
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </SelectiveContextManagerGlobal>
  );
}

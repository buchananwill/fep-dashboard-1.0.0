'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SelectiveContextManagerGlobal } from 'selective-context';

export function LibraryProvidersWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <SelectiveContextManagerGlobal>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </SelectiveContextManagerGlobal>
  );
}

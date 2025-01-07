'use client';

import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { ScrollArea } from '@mantine/core';
import { useGlobalController } from 'selective-context';
import { ObjectPlaceholder } from '@/api/client-literals';

export const MainScrollPosition = 'main-scroll-position';
export const MainScrollPortId = 'main-scroll-port';
export default function MainScrollPort({ children }: PropsWithChildren) {
  const { dispatch } = useGlobalController({
    contextKey: MainScrollPosition,
    listenerKey: 'scrollArea',
    initialValue: ObjectPlaceholder
  });

  const onScrollPositionChange = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      dispatch({ x, y });
    },
    [dispatch]
  );

  return (
    <ScrollArea
      className={
        'from-primary-200 h-[100vh] w-[100vw] bg-gradient-to-b to-white '
      }
      onScrollPositionChange={onScrollPositionChange}
      viewportProps={{
        id: MainScrollPortId
      }}
    >
      <div className={'flex h-full w-full'}>
        <div className={'center-all-margin '}>{children}</div>
      </div>
    </ScrollArea>
  );
}

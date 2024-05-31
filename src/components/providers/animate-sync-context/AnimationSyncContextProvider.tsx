'use client';
import React, { PropsWithChildren } from 'react';
import {
  AnimationSyncContext,
  createSineLut
} from '@/components/providers/animate-sync-context/animationSyncContextCreator';


export default function AnimationSyncContextProvider({
  children
}: PropsWithChildren) {
  return (
    <AnimationSyncContext.Provider value={{ sineLut: createSineLut() }}>
      {children}
    </AnimationSyncContext.Provider>
  );
}

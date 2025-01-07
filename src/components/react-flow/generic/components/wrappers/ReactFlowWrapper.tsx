'use client';
import React, { PropsWithChildren } from 'react';

import { ReactFlowProvider } from '@xyflow/react';
import {
  EdgeAnimationContextProvider,
  EdgeAnimationContextType
} from '@/components/react-flow/generic/components/wrappers/edgeAnimationContext';
import { ObjectPlaceholder } from '@/api/client-literals';

export function ReactFlowWrapper({
  children,
  edgeAnimationContext = ObjectPlaceholder
}: { edgeAnimationContext?: EdgeAnimationContextType } & PropsWithChildren) {
  return (
    <ReactFlowProvider>
      <EdgeAnimationContextProvider currentContext={edgeAnimationContext}>
        <div style={{ width: '100vw', height: '100vh' }}>{children}</div>
      </EdgeAnimationContextProvider>
    </ReactFlowProvider>
  );
}

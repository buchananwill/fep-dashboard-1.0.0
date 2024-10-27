'use client';
import React, { PropsWithChildren } from 'react';

import { ReactFlowProvider } from '@xyflow/react';

export function ReactFlowWrapper({ children }: PropsWithChildren) {
  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>{children}</div>
    </ReactFlowProvider>
  );
}

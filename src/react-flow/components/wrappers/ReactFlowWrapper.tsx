'use client';
import React, { PropsWithChildren } from 'react';

import 'reactflow/dist/style.css';

export function ReactFlowWrapper({ children }: PropsWithChildren) {
  return <div style={{ width: '100vw', height: '100vh' }}>{children}</div>;
}

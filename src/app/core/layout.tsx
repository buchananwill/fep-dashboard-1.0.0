import React, { Suspense } from 'react';
import When_loading from '@/app/core/when_loading';

export default function CoreLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<When_loading />}>{children}</Suspense>;
}

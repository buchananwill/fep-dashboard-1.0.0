import React, { Suspense } from 'react';
import Loading from '@/app/core/loading';

export default function CoreLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

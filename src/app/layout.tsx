import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LibraryProvidersWrapper } from '@/components/providers/LibraryProvidersWrapper';
import React, { Suspense } from 'react';
import JoyrideWrapper from '@/components/react-joyride/JoyrideWrapper';
import { steps } from '@/components/react-joyride/steps';
import TooltipSingleton from '@/components/tooltip/TooltipSingleton';
import NavPopoverTrigger from '@/components/navigation/NavPopoverTrigger';
import { MasterChangesTrackWrapper } from '@/components/auth/MasterChangesTrackerWrapper';
import UserAvatar from '@/components/auth/UserAvatar';
import { auth } from '@/auth';
import When_loading from '@/app/core/when_loading';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FEP Dashboard',
  description: 'Business resource scheduling management for the 21st Century.'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <title>FEP Dashboard</title>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <LibraryProvidersWrapper>
          <MasterChangesTrackWrapper session={session}>
            <UserAvatar />
          </MasterChangesTrackWrapper>
          <div
            className={
              'flex h-[100vh] w-[100vw] bg-gradient-to-b from-blue-200 to-white '
            }
          >
            <div className={'center-all-margin '}>
              <Suspense fallback={<When_loading />}>{children}</Suspense>
            </div>
          </div>
          <TooltipSingleton />
          <NavPopoverTrigger />
        </LibraryProvidersWrapper>
        <JoyrideWrapper steps={steps} />
      </body>
    </html>
  );
}

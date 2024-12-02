import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LibraryProvidersWrapper } from '@/components/providers/LibraryProvidersWrapper';
import React, { Suspense } from 'react';
import TooltipSingleton from '@/components/tooltip/TooltipSingleton';
import NavPopoverTrigger from '@/components/navigation/NavPopoverTrigger';
import { MasterChangesTrackWrapper } from '@/components/auth/MasterChangesTrackerWrapper';
import UserAvatar from '@/components/auth/UserAvatar';
import { auth } from '@/auth';
import When_loading from '@/app/core/when_loading';
import { ColorSchemeScript } from '@mantine/core';
import MainScrollPort from '@/components/generic/MainScrollPort';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';

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

  let avatarProps: Record<string, any> = {};
  avatarProps.email = session?.user?.email;
  avatarProps.image = session?.user?.image;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>FEP Dashboard</title>
        <ColorSchemeScript />
      </head>
      <body
      // className={inter.className}
      >
        <LibraryProvidersWrapper>
          <MasterChangesTrackWrapper session={avatarProps}>
            <UserAvatar />
          </MasterChangesTrackWrapper>
          <MainScrollPort>
            <Suspense fallback={<When_loading />}>{children}</Suspense>
          </MainScrollPort>
          <TooltipSingleton />
          <NavPopoverTrigger />
          <Notifications />
        </LibraryProvidersWrapper>
      </body>
    </html>
  );
}

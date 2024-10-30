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
import { ColorSchemeScript, ScrollArea } from '@mantine/core';
import { cookies, headers } from 'next/headers';
import { getSchemaName } from '@/api/auth/get-schema-name';
import { redirect } from 'next/navigation';
// import '@mantine/core/styles.css';

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
  if (session) {
    const headers1 = headers();
    console.log(headers1);
    const schemaName = getSchemaName();
    if (!schemaName) {
      // redirect('/admin/create-schema');
    }
  }

  let avatarProps: Record<string, any> = {};
  avatarProps.email = session?.user?.email;
  avatarProps.image = session?.user?.image;
  return (
    <html lang="en">
      <head>
        <title>FEP Dashboard</title>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <LibraryProvidersWrapper>
          <MasterChangesTrackWrapper session={avatarProps}>
            <UserAvatar />
          </MasterChangesTrackWrapper>
          <ScrollArea
            className={
              'h-[100vh] w-[100vw] bg-gradient-to-b from-blue-200 to-white '
            }
          >
            <div className={'flex h-full w-full'}>
              <div className={'center-all-margin '}>
                <Suspense fallback={<When_loading />}>{children}</Suspense>
              </div>
            </div>
          </ScrollArea>
          <TooltipSingleton />
          <NavPopoverTrigger />
        </LibraryProvidersWrapper>
        <JoyrideWrapper steps={steps} />
      </body>
    </html>
  );
}

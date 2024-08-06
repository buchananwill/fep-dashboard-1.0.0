import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LibraryProvidersWrapper } from '@/components/providers/LibraryProvidersWrapper';
import React from 'react';
import JoyrideWrapper from '@/components/react-joyride/JoyrideWrapper';
import { steps } from '@/components/react-joyride/steps';
import TooltipSingleton from '@/components/generic/TooltipSingleton';
import NavPopoverTrigger from '@/components/navigation/NavPopoverTrigger';
import { MasterChangesTrackWrapper } from '@/components/auth/MasterChangesTrackerWrapper';
import UserAvatar from '@/components/auth/UserAvatar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FEP Dashboard',
  description: 'Business resource scheduling management for the 21st Century.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LibraryProvidersWrapper>
          <MasterChangesTrackWrapper>
            <UserAvatar />
          </MasterChangesTrackWrapper>
          <div className={'flex'}>
            <div className={'center-all-margin'}>{children}</div>
          </div>
          <TooltipSingleton />
          <NavPopoverTrigger />
        </LibraryProvidersWrapper>
        <JoyrideWrapper steps={steps} />
      </body>
    </html>
  );
}

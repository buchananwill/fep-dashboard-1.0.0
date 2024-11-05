'use client';

import { Button, Popover } from '@mantine/core';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { PropsWithChildren } from 'react';

export default function NavPopover({ children }: PropsWithChildren) {
  return (
    <Popover trapFocus>
      <Popover.Target>
        <Button
          variant={'subtle'}
          radius={'50%'}
          styles={{ root: { padding: '0px', height: '52px', width: '52px' } }}
        >
          <GlobeAltIcon className={'h-10 w-10 text-black'} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>{children}</Popover.Dropdown>
    </Popover>
  );
}

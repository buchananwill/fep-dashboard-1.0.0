'use client';
import { Controls, MiniMap, Panel } from '@xyflow/react';
import { Button, Popover } from '@mantine/core';
import {
  ChevronRightIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/react/24/solid';
import { GraphForceSliders } from '@/components/react-flow/generic/components/generic/GraphForceSliders';
import { NodeDetailsModal } from '@/components/react-flow/generic/components/nodes/NodeDetailsModal';
import React, { useCallback, useRef, useState } from 'react';
import { useEscapeToClose } from '@/components/react-flow/generic/hooks/useEscapeToClose';
import { useDisclosure } from '@mantine/hooks';

export function FlowOverlay({
  initialized,
  toggle,
  running
}: {
  initialized: boolean;
  toggle?: () => void;
  running: boolean;
}) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Panel position={'bottom-right'}>
        <div className={'flex'}>
          <MiniMap style={{ position: 'relative' }} />
          <Controls style={{ position: 'relative' }} />
        </div>
      </Panel>
      <Panel position={'top-left'} className={'flex gap-1 align-middle'}>
        <Popover opened={opened} onClose={close}>
          <Popover.Target>
            <Button
              className={'relative w-56'}
              variant={'light'}
              onClick={() => {
                opened ? close() : open();
              }}
              rightSection={
                <ChevronRightIcon
                  className={`w-8 transition-transform ${opened ? ' rotate-90 ' : ''}`}
                />
              }
            >
              Forces
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <GraphForceSliders />
          </Popover.Dropdown>
        </Popover>
        {initialized && toggle && (
          <button
            // onClick={onClick}
            onClick={toggle}
            color={'default'}
            // variant={'light'}
            className={running ? 'animate-pulse' : ''}
          >
            {running ? (
              <StopIcon className={'h-5 w-5 text-red-500'} />
            ) : (
              <PlayIcon className={'h-5 w-5 text-emerald-500'} />
            )}{' '}
            Force Layout
          </button>
        )}
      </Panel>
      <NodeDetailsModal className={'max-w-6xl'} />
    </>
  );
}

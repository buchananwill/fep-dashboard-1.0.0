'use client';
import { Controls, MiniMap, Panel } from 'reactflow';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import {
  ChevronRightIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/react/24/solid';
import { GraphForceSliders } from '@/react-flow/components/generic/GraphForceSliders';
import { NodeDetailsModal } from '@/react-flow/components/nodes/NodeDetailsModal';
import React, { useEffect, useRef, useState } from 'react';
import { useEscapeToClose } from '@/react-flow/hooks/useEscapeToClose';

export function FlowOverlay({
  initialized,
  toggle,
  running
}: {
  initialized: boolean;
  toggle?: () => void;
  running: boolean;
}) {
  const [showSliders, setShowSliders] = useState(false);
  useEscapeToClose(showSliders, setShowSliders);
  const rerenderRef = useRef(false);

  useEffect(() => {
    if (!rerenderRef.current && toggle) {
      toggle();
      rerenderRef.current = true;
    }
  }, [toggle]);

  return (
    <>
      <Controls />
      <MiniMap />
      <Panel position={'top-left'}>
        <Popover
          classNames={{ base: 'w-56' }}
          isOpen={showSliders}
          onOpenChange={setShowSliders}
          shouldCloseOnInteractOutside={() => false}
        >
          <PopoverTrigger className={'p-0'}>
            <Button className={'relative w-56'} variant={'light'}>
              Forces{' '}
              <ChevronRightIcon
                className={`absolute left-2 p-1 transition-transform ${showSliders ? ' rotate-90 ' : ''}`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <GraphForceSliders />
          </PopoverContent>
        </Popover>
      </Panel>
      <NodeDetailsModal className={'max-w-6xl'} />
      <Panel position={'top-right'}>
        {initialized && toggle && (
          <Button
            onPress={toggle}
            color={'default'}
            variant={'light'}
            className={running ? 'animate-pulse' : ''}
          >
            {running ? (
              <StopIcon className={'h-5 w-5 text-red-500'} />
            ) : (
              <PlayIcon className={'h-5 w-5 text-emerald-500'} />
            )}{' '}
            Force Layout
          </Button>
        )}
      </Panel>
    </>
  );
}

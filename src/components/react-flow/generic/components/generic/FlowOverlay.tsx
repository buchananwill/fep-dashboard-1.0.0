'use client';
import { Controls, MiniMap, Panel } from '@xyflow/react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import {
  ChevronRightIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/react/24/solid';
import { GraphForceSliders } from '@/components/react-flow/generic/components/generic/GraphForceSliders';
import { NodeDetailsModal } from '@/components/react-flow/generic/components/nodes/NodeDetailsModal';
import React, { useCallback, useRef, useState } from 'react';
import { useEscapeToClose } from '@/components/react-flow/generic/hooks/useEscapeToClose';

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
  const toggleRef = useRef(toggle);
  toggleRef.current = toggle;

  const onPress = useCallback(() => {
    if (toggleRef.current) toggleRef.current();
  }, []);

  return (
    <>
      <Panel position={'bottom-right'}>
        <div className={'flex'}>
          <MiniMap style={{ position: 'relative' }} />
          <Controls style={{ position: 'relative' }} />
        </div>
      </Panel>
      <Panel position={'top-left'} className={'flex gap-1 align-middle'}>
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
        {initialized && toggle && (
          <button
            // onPress={onPress}
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
      {/*<Panel position={'top-right'}>*/}
      {/*  */}
      {/*</Panel>*/}
    </>
  );
}

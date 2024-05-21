'use client';
import { Controls, MiniMap, Panel } from 'reactflow';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { GraphForceSliders } from '@/react-flow/components/generic/GraphForceSliders';
import { NodeDetailsModal } from '@/react-flow/components/nodes/NodeDetailsModal';
import React, { useState } from 'react';
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
            <Button className={'relative w-56'}>
              Forces{' '}
              <ChevronLeftIcon
                className={`absolute right-2 p-1 transition-transform ${showSliders ? ' -rotate-90 ' : ''}`}
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
            color={running ? 'danger' : 'success'}
            className={running ? 'animate-pulse' : ''}
          >
            {running ? 'Stop' : 'Start'} force simulation
          </Button>
        )}
      </Panel>
    </>
  );
}

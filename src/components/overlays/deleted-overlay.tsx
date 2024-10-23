import { XMarkIcon } from '@heroicons/react/24/outline';
import { Overlay } from './overlay';
import React from 'react';
import { Button } from '@mantine/core';

export interface DeletedOverlayProps {
  show: boolean;
  handleUnDelete?: () => void;
  classNames?: {
    overlay?: string;
    button?: string;
  };
}

export function DeletedOverlay({
  show,
  handleUnDelete,
  classNames
}: DeletedOverlayProps) {
  return (
    <>
      {show && (
        <Overlay className={classNames?.overlay}>
          <Button
            className={`h-full w-full place-content-center rounded-none border-0 p-2 transition-colors duration-500 ${classNames?.button}`}
            onClick={handleUnDelete}
            styles={{
              root: {
                height: '100%',
                width: '100%'
              }
            }}
            variant={'subtle'}
          >
            <XMarkIcon className={'h-full  opacity-50'}></XMarkIcon>
          </Button>
        </Overlay>
      )}
    </>
  );
}

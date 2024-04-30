import { XMarkIcon } from '@heroicons/react/24/outline';
import { Overlay } from './overlay';
import { Button } from '@nextui-org/button';
import React from 'react';

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
            className={`w-full h-full transition-colors duration-500 rounded-none border-0 place-content-center p-2 ${classNames?.button}`}
            onPress={handleUnDelete}
            variant={'ghost'}
            isIconOnly
          >
            <XMarkIcon className={'h-full  opacity-50'}></XMarkIcon>
          </Button>
        </Overlay>
      )}
    </>
  );
}

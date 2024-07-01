import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import {
  ArrowDownOnSquareStackIcon,
  MinusCircleIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { UsePopoverFixReturn } from '@/react-flow/hooks/usePopoverFix';
import { b } from '@nextui-org/slider/dist/use-slider-a94a4c83';

export default function NodeGraphEditCluster({
  addSibling,
  label,
  addChild,
  openDetailsModal,
  deleteNode,
  fixAddProps,
  popoverPos,
  fixDeleteProps,
  showAddChild = true,
  showAddSibling = true,
  showDelete = true
}: {
  addChild: () => void;
  showAddChild?: boolean;
  addSibling: () => void;
  showAddSibling?: boolean;
  label?: string;
  openDetailsModal: () => void;
  showDelete?: boolean;
  deleteNode: () => void;
  fixAddProps: UsePopoverFixReturn;
  fixDeleteProps: UsePopoverFixReturn;
  popoverPos: number[];
}) {
  return (
    <>
      <div className={'flex items-center justify-between gap-2'}>
        {showDelete && (
          <Popover
            {...fixDeleteProps}
            placement={'right'}
            triggerScaleOnOpen
            updatePositionDeps={popoverPos}
            triggerType={'menu'}
          >
            <PopoverTrigger>
              <Button size={'sm'} className={'p-1.5'} isIconOnly>
                <MinusCircleIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className={'grid grid-cols-1 gap-1'}>
                <Button isIconOnly className={'p-2'} onPress={deleteNode}>
                  <TrashIcon />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
        <Button size={'sm'} className={'grow'} onPress={openDetailsModal}>
          {label ?? 'Details'}
        </Button>
        {(showAddSibling || showAddChild) && (
          <Popover
            {...fixAddProps}
            placement={'right'}
            triggerScaleOnOpen
            updatePositionDeps={popoverPos}
            triggerType={'menu'}
          >
            <PopoverTrigger>
              <Button size={'sm'} className={'p-1.5'} isIconOnly>
                <PlusCircleIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className={'grid grid-cols-1 gap-1'}>
                {showAddSibling && (
                  <Button isIconOnly className={'p-1.5'} onPress={addSibling}>
                    <ArrowDownOnSquareStackIcon className={'-rotate-90'} />
                  </Button>
                )}
                {showAddChild && (
                  <Button isIconOnly className={'p-1.5'} onPress={addChild}>
                    <ArrowDownOnSquareStackIcon />
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  );
}

import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import {
  ArrowDownOnSquareStackIcon,
  MinusCircleIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { UsePopoverFixReturn } from '@/components/react-flow/generic/hooks/usePopoverFix';

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
  showDelete = true,
  orientation = 'top-to-bottom'
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
  orientation?: 'left-to-right' | 'top-to-bottom';
}) {
  return (
    <>
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
                  <ArrowDownOnSquareStackIcon
                    className={
                      orientation === 'top-to-bottom' ? '-rotate-90' : ''
                    }
                  />
                </Button>
              )}
              {showAddChild && (
                <Button isIconOnly className={'p-1.5'} onPress={addChild}>
                  <ArrowDownOnSquareStackIcon
                    className={
                      orientation === 'left-to-right' ? '-rotate-90' : ''
                    }
                  />
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}

import { Button, Popover } from '@mantine/core';
import {
  ArrowDownOnSquareStackIcon,
  MinusCircleIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { UsePopoverFixReturn } from '@/components/react-flow/generic/hooks/usePopoverFix';
import clsx from 'clsx';

export default function NodeGraphEditCluster({
  addSibling,
  label,
  addChild,
  openDetailsModal,
  deleteNode,
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
        <Popover>
          <Popover.Target>
            <Button
              size={'sm'}
              variant={'outline'}
              color={'var(--mantine-color-text)'}
              styles={{
                root: {
                  width: 'fit-content',
                  paddingLeft: '8px',
                  paddingRight: '8px'
                }
              }}
            >
              <MinusCircleIcon className={'w-6'} />
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <div className={'grid grid-cols-1 gap-1'}>
              <Button onClick={deleteNode}>
                <TrashIcon className={'w-6'} />
              </Button>
            </div>
          </Popover.Dropdown>
        </Popover>
      )}
      <Button
        size={'sm'}
        className={'grow'}
        variant={'outline'}
        color={'var(--mantine-color-text)'}
        onClick={openDetailsModal}
        autoContrast={true}
      >
        {label ?? 'Details'}
      </Button>
      {(showAddSibling || showAddChild) && (
        <Popover>
          <Popover.Target>
            <Button
              size={'sm'}
              variant={'outline'}
              color={'black'}
              styles={{
                root: {
                  width: 'fit-content',
                  paddingLeft: '8px',
                  paddingRight: '8px'
                }
              }}
            >
              <PlusCircleIcon className={'w-6'} />
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <div className={'grid grid-cols-1 gap-1'}>
              {showAddSibling && (
                <Button onClick={addSibling}>
                  <ArrowDownOnSquareStackIcon
                    className={clsx(
                      orientation === 'top-to-bottom' ? '-rotate-90' : '',
                      'w-6'
                    )}
                  />
                </Button>
              )}
              {showAddChild && (
                <Button onClick={addChild}>
                  <ArrowDownOnSquareStackIcon
                    className={clsx(
                      orientation === 'left-to-right' ? '-rotate-90' : '',
                      'w-6'
                    )}
                  />
                </Button>
              )}
            </div>
          </Popover.Dropdown>
        </Popover>
      )}
    </>
  );
}

'use client';
import TabbedSelectorTables from '@/components/tables/TabbedSelectorTables';
import { TabbedTablesDataProps } from '@/components/tables/types';
import { Button, Popover } from '@mantine/core';

export default function FinderTableButton(
  tableButtonProps: TabbedTablesDataProps
) {
  return (
    <div className={'absolute'}>
      <Popover trapFocus withArrow position={'right-start'}>
        <Popover.Target>
          <Button variant={'ghost'} color={'primary'}>
            Find
          </Button>
        </Popover.Target>
        <Popover.Dropdown className={'p-4'}>
          <TabbedSelectorTables
            data={tableButtonProps}
            className={'w-[45vw]'}
          ></TabbedSelectorTables>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

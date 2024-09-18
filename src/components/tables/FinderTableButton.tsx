import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import TabbedSelectorTables from '@/components/tables/TabbedSelectorTables';
import { TabbedTablesDataProps } from '@/components/tables/types';

export default function FinderTableButton(
  tableButtonProps: TabbedTablesDataProps
) {
  return (
    <div className={'absolute'}>
      <Popover shouldCloseOnBlur={false} placement={'right'}>
        <PopoverTrigger>
          <Button variant={'light'}>Find</Button>
        </PopoverTrigger>
        <PopoverContent className={'p-4'}>
          <TabbedSelectorTables
            data={tableButtonProps}
            className={'w-[45vw]'}
          ></TabbedSelectorTables>
        </PopoverContent>
      </Popover>
    </div>
  );
}

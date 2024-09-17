import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import TabbedSelectorTables, {
  SelectorTableDataProps
} from '@/components/tables/TabbedSelectorTables';

export default function FinderTableButton(
  tableButtonProps: SelectorTableDataProps
) {
  return (
    <div className={'fixed left-1/2 top-2'}>
      <Popover shouldCloseOnBlur={false}>
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

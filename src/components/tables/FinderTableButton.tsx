import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import TabbedSelectorTables, {
  SelectorTableData
} from '@/app/service-categories/[id]/roles/_components/TabbedSelectorTables';

export default function FinderTableButton(tableButtonProps: SelectorTableData) {
  return (
    <div className={'fixed left-1/2 top-2'}>
      <Popover shouldCloseOnBlur={false}>
        <PopoverTrigger>
          <Button variant={'light'}>Find</Button>
        </PopoverTrigger>
        <PopoverContent className={'p-4'}>
          <TabbedSelectorTables
            className={'w-[45vw]'}
            {...tableButtonProps}
          ></TabbedSelectorTables>
        </PopoverContent>
      </Popover>
    </div>
  );
}

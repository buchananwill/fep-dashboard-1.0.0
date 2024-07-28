import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import TabbedSelectorTables from '@/app/service-categories/[id]/roles/_components/TabbedSelectorTables';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { AssetRoleDto } from '@/api/dtos/AssetRoleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';

export default function FinderTableButton(
  tableButtonProps: FinderTableButtonProps
) {
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

export interface FinderTableButtonProps {
  workTaskTypes?: WorkTaskTypeDto[];
  providerRoles?: ProviderRoleDto[];
  assetRoles?: AssetRoleDto[];
  workProjectSeriesSchemas?: WorkProjectSeriesSchemaDto[];
}

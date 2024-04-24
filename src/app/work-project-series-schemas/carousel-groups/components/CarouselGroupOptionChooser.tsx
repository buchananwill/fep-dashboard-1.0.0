import { CollectionItemChooserProps } from '@/app/work-project-series-schemas/bundles/components/collectionItemChooserProps';
import { useDtoStoreDispatch } from 'dto-stores';
import { useItemChooserMap } from '@/utils/useItemChooserMap';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useListboxSelectionChangeCallback } from '@/utils/useListboxSelectionChangeCallback';
import React, { useMemo } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { CarouselGroupDto } from '@/app/api/dtos/CarouselGroupDtoSchema';
import { TransientIdOffset } from '@/app/api/main';

function produceCarouselGroup(
  updatedKeys: string[],
  carouselGroupDto: CarouselGroupDto
): CarouselGroupDto {
  const carouselOptionList = updatedKeys.map((schemaUuid, index) => ({
    id: index + TransientIdOffset,
    carouselGroupId: carouselGroupDto.id,
    workProjectSeriesSchemaId: schemaUuid
  }));
  return { ...carouselGroupDto, carouselGroupOptions: carouselOptionList };
}

export default function CarouselGroupOptionChooser({
  collectionId,
  entityClass,
  referencedItemContextKeys
}: CollectionItemChooserProps) {
  const { currentState, dispatchWithoutControl } =
    useDtoStoreDispatch<CarouselGroupDto>(
      collectionId,
      entityClass,
      'itemChooser'
    );
  const { itemMap: schemaMap, items } =
    useItemChooserMap<WorkProjectSeriesSchemaDto>(
      referencedItemContextKeys,
      collectionId
    );
  const handleSelectionChange = useListboxSelectionChangeCallback(
    dispatchWithoutControl,
    produceCarouselGroup
  );

  const selectedKeys = useMemo(() => {
    return currentState.carouselGroupOptions.map(
      (option) => option.workProjectSeriesSchemaId
    );
  }, [currentState]);

  return (
    <div className={'flex flex-col'}>
      <div className={'flex justify-between items-baseline mb-2'}>
        <span>{currentState.name}</span>
      </div>
      <Listbox
        items={items}
        selectedKeys={selectedKeys}
        selectionMode={'multiple'}
        variant={'bordered'}
        aria-label={'Select Collection Items'}
        onSelectionChange={handleSelectionChange}
        classNames={{ base: 'border-2 rounded-lg p-2' }}
      >
        {(listboxItem) => (
          <ListboxItem
            key={listboxItem.id}
            classNames={{ base: 'data-[selected=true]:bg-emerald-100' }}
            textValue={listboxItem.name}
          >
            {listboxItem.name}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
}

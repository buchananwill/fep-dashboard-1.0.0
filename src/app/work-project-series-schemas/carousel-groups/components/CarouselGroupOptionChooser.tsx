import { CollectionItemChooserProps } from '@/app/work-project-series-schemas/bundles/components/collectionItemChooserProps';
import { useDtoStoreDispatch } from 'dto-stores';
import { useItemChooserMap } from '@/utils/useItemChooserMap';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useListboxSelectionChangeCallback } from '@/utils/useListboxSelectionChangeCallback';
import React, { useMemo } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { CarouselGroupDto } from '@/app/api/dtos/CarouselGroupDtoSchema';
import { TransientIdOffset } from '@/app/api/main';
import { useRenameEntity } from '@/components/modals/useRenameEntity';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import RenameModal from '@/components/modals/RenameModal';
import { Button } from '@nextui-org/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {
  ArrayPlaceholder,
  useSelectiveContextGlobalDispatch
} from 'selective-context';

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

  const { onOpen, dispatchRename, ...renameProps } = useRenameEntity(
    entityClass,
    currentState,
    'itemChooserTabPanel',
    dispatchWithoutControl
  );

  const selectedKeys = useMemo(() => {
    return currentState.carouselGroupOptions.map(
      (option) => option.workProjectSeriesSchemaId
    );
  }, [currentState]);

  const { dispatchWithoutControl: updateMasterList, currentState: masterList } =
    useSelectiveContextGlobalDispatch<CarouselGroupDto[]>({
      contextKey: `${entityClass}:masterList`,
      initialValue: ArrayPlaceholder,
      listenerKey: 'itemChooser'
    });

  return (
    <div className={'flex flex-col'}>
      <div className={'grid grid-cols-2 gap-1 items-baseline mb-2'}>
        <Button
          onPress={onOpen}
          endContent={<PencilSquareIcon className={'px-1'} />}
        >
          {currentState.name}
        </Button>
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
      <RenameModal {...renameProps} />
    </div>
  );
}

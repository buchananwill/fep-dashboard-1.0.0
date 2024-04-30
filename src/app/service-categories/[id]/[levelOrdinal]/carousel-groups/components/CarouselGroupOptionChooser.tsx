import { CollectionItemChooserProps } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/collectionItemChooserProps';
import { useDtoStoreDispatch } from 'dto-stores';
import { useItemChooserMap } from '@/utils/useItemChooserMap';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useListboxSelectionChangeCallback } from '@/utils/useListboxSelectionChangeCallback';
import React, { useCallback, useMemo } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { CarouselGroupDto } from '@/app/api/dtos/CarouselGroupDtoSchema';
import { TransientIdOffset } from '@/app/api/main';
import { useRenameEntity } from '@/components/modals/useRenameEntity';
import { EntityClassMap } from '@/app/api/entity-class-map';
import RenameModal from '@/components/modals/RenameModal';
import { Button } from '@nextui-org/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {
  ArrayPlaceholder,
  useSelectiveContextGlobalDispatch
} from 'selective-context';
import { StepperContext } from '@/components/generic/stepperContextCreator';
import LandscapeStepper from '@/components/generic/LandscapeStepper';
import { CarouselDto } from '@/app/api/dtos/CarouselDtoSchema';
import { CarouselLeanDto } from '@/app/api/dtos/CarouselLeanDtoSchema';

function produceCarouselGroupOptionsEdit(
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
    produceCarouselGroupOptionsEdit,
    dispatchWithoutControl
  );

  const { onOpen, dispatchTextChange, ...renameProps } = useRenameEntity(
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

  const editCarouselCount = useCallback(
    (direction: 'inc' | 'dec') => {
      if (direction === 'inc') {
        dispatchWithoutControl((group) => {
          const currentCarouselCount = group.carousels.length + 1;
          const carouselsUpdate: CarouselLeanDto[] = [
            ...group.carousels,
            {
              id: crypto.randomUUID(),
              carouselOrdinal: currentCarouselCount
            }
          ];
          return { ...group, carousels: carouselsUpdate };
        });
      } else {
        dispatchWithoutControl((group) => {
          if (group.carousels.length === 0) return group;
          else
            return {
              ...group,
              carousels: group.carousels.slice(0, group.carousels.length - 1)
            };
        });
      }
    },
    [dispatchWithoutControl]
  );

  return (
    <div className={'flex flex-col'}>
      <div className={'grid grid-cols-2 gap-1 items-baseline mb-2'}>
        <Button
          onPress={onOpen}
          endContent={<PencilSquareIcon className={'px-1'} />}
        >
          {currentState.name}
        </Button>
        <div className={'flex justify-center'}>
          <StepperContext.Provider
            value={{
              increment: () => editCarouselCount('inc'),
              decrement: () => editCarouselCount('dec'),
              current: currentState.carousels.length
            }}
          >
            <span className={'pr-2'}>Carousels:</span>{' '}
            <LandscapeStepper></LandscapeStepper>
          </StepperContext.Provider>
        </div>
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

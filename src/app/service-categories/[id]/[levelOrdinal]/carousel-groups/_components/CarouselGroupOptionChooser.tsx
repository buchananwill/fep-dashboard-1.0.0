import { CollectionItemChooserProps } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_functions/collectionItemChooserProps';
import { BaseDtoUiProps, DtoUiWrapper } from 'dto-stores';
import { useItemChooserMap } from '@/hooks/useItemChooserMap';
import { useListboxSelectionChangeCallback } from '@/hooks/useListboxSelectionChangeCallback';
import React, { useCallback, useMemo } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { StepperContext } from '@/components/generic/stepperContextCreator';
import LandscapeStepper from '@/components/generic/LandscapeStepper';
import { EditTextDeleteEntityPopover } from '@/components/generic/EditTextDeleteEntityPopover';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { CarouselLeanDto } from '@/api/dtos/CarouselLeanDtoSchema';
import { produceCarouselGroupOptionsEdit } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/_components/produceCarouselGroupOptionsEdit';

export default function CarouselGroupOptionChooser({
  collectionId,
  entityClass,
  referencedItemContextKeys
}: CollectionItemChooserProps) {
  return (
    <DtoUiWrapper
      renderAs={InnerChooserComponent}
      entityClass={entityClass}
      entityId={collectionId}
      collectionId={collectionId}
      referencedItemContextKeys={referencedItemContextKeys}
    />
  );
}

function InnerChooserComponent(
  props: BaseDtoUiProps<CarouselGroupDto> &
    Omit<CollectionItemChooserProps, 'entityClass'>
) {
  const { referencedItemContextKeys, collectionId, ...dtoProps } = props;
  const {
    dispatchWithoutControl,
    entity: currentState,
    deleted,
    dispatchDeletion
  } = dtoProps;
  const { items } = useItemChooserMap<WorkProjectSeriesSchemaDto>(
    referencedItemContextKeys,
    collectionId
  );
  const handleSelectionChange = useListboxSelectionChangeCallback(
    produceCarouselGroupOptionsEdit,
    dispatchWithoutControl
  );

  const selectedKeys = useMemo(() => {
    return currentState.carouselGroupOptions.map(
      (option) => option.workProjectSeriesSchemaId
    );
  }, [currentState]);

  const editCarouselCount = useCallback(
    (direction: 'inc' | 'dec') => {
      if (!dispatchWithoutControl) return;
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
    <div className={'flex flex-col relative'}>
      <DeletedOverlay
        show={deleted}
        classNames={{ overlay: 'rounded-xl' }}
        handleUnDelete={() => {
          if (!dispatchDeletion) return;
          dispatchDeletion((list) => list.filter((id) => id !== collectionId));
        }}
      />
      <div className={'grid grid-cols-2 gap-1 items-baseline mb-2'}>
        <EditTextDeleteEntityPopover {...dtoProps} stringKey={'name'} />
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
    </div>
  );
}

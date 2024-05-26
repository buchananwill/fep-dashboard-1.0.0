import { CollectionItemChooserProps } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_functions/collectionItemChooserProps';
import { DtoUiComponentProps, useDtoComponent } from 'dto-stores';
import { useItemChooserMap } from '@/utils/useItemChooserMap';
import { useListboxSelectionChangeCallback } from '@/utils/useListboxSelectionChangeCallback';
import React, { useCallback, useMemo } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { StepperContext } from '@/components/generic/stepperContextCreator';
import LandscapeStepper from '@/components/generic/LandscapeStepper';
import { nameAccessor, nameSetter } from '@/components/modals/nameSetter';
import { EditTextDeleteEntityPopover } from '@/components/generic/EditTextDeleteEntityPopover';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { CarouselLeanDto } from '@/api/dtos/CarouselLeanDtoSchema';
import { produceCarouselGroupOptionsEdit } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/components/produceCarouselGroupOptionsEdit';

export default function CarouselGroupOptionChooser({
  collectionId,
  entityClass,
  referencedItemContextKeys
}: CollectionItemChooserProps) {
  const CurriedInnerComponent = useCallback(
    (dtoProps: DtoUiComponentProps<CarouselGroupDto>) => {
      return (
        <InnerChooserComponent
          collectionId={collectionId}
          referencedItemContextKeys={referencedItemContextKeys}
          {...dtoProps}
        />
      );
    },
    [collectionId, referencedItemContextKeys]
  );
  const DtoComponent = useDtoComponent(entityClass, CurriedInnerComponent);

  return <DtoComponent id={collectionId} />;
}

function InnerChooserComponent(
  props: DtoUiComponentProps<CarouselGroupDto> &
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
        <CurriedComponent {...dtoProps} />
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

const CurriedComponent = (props: DtoUiComponentProps<CarouselGroupDto>) => {
  return (
    <EditTextDeleteEntityPopover
      listenerKey={'chooser'}
      textAccessor={nameAccessor}
      textSetter={nameSetter}
      {...props}
    />
  );
};

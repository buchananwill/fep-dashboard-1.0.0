'use client';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import {
  DtoComponentWrapper,
  useDtoStoreDispatch,
  useDtoStoreDispatchAndListener
} from 'dto-stores';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import React, { useMemo } from 'react';
import BundleItemWithInclusionCount from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/BundleItemWithInclusionCount';
import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/sum-delivery-allocations';
import { EntityClassMap } from '@/api/entity-class-map';
import { Chip } from '@nextui-org/chip';
import { useItemChooserMap } from '@/utils/useItemChooserMap';
import { CollectionItemChooserProps } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_functions/collectionItemChooserProps';
import { useListboxSelectionChangeCallback } from '@/utils/useListboxSelectionChangeCallback';
import { EditTextDeleteEntityPopover } from '@/components/generic/EditTextDeleteEntityPopover';
import { nameAccessor, nameSetter } from '@/components/modals/nameSetter';
import { useDtoStoreDelete } from 'dto-stores/dist/hooks/useDtoStoreDelete';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { isNotUndefined } from '@/api/main';

const produceBundle = (
  updatedKeys: string[],
  bundle: WorkSeriesSchemaBundleDto
) => ({
  ...bundle,
  workProjectSeriesSchemaIds: updatedKeys
});

export default function BundleItemChooser({
  collectionId,
  entityClass,
  referencedItemContextKeys
}: CollectionItemChooserProps) {
  const { currentState, dispatchWithoutControl } =
    useDtoStoreDispatchAndListener<WorkSeriesSchemaBundleDto>(
      collectionId,
      entityClass,
      'itemChooser'
    );

  const { deleted, dispatchDeletion } = useDtoStoreDelete(
    entityClass,
    collectionId,
    'bundleItemChooser'
  );

  const { itemMap: schemaMap, items } =
    useItemChooserMap<WorkProjectSeriesSchemaDto>(
      referencedItemContextKeys,
      collectionId
    );
  const handleSelectionChange = useListboxSelectionChangeCallback(
    produceBundle,
    dispatchWithoutControl
  );

  const currentAllocationSum = useMemo(() => {
    const workProjectSeriesSchemaDtos = currentState.workProjectSeriesSchemaIds
      .map((id) =>
        schemaMap.get(`${EntityClassMap.workProjectSeriesSchema}:${id}`)
      )
      .filter(isNotUndefined);
    return sumAllSchemas(workProjectSeriesSchemaDtos);
  }, [currentState, schemaMap]);

  return (
    <div className={'flex flex-col relative'}>
      <DeletedOverlay
        classNames={{ overlay: 'rounded-lg' }}
        show={deleted}
        handleUnDelete={() =>
          dispatchDeletion((list) => list.filter((id) => id !== collectionId))
        }
      />
      <div className={'grid grid-cols-2 items-baseline mb-2'}>
        <DtoComponentWrapper<WorkSeriesSchemaBundleDto>
          entityClass={entityClass}
          id={collectionId}
          uiComponent={(props) => {
            return (
              <EditTextDeleteEntityPopover
                classNames={{ button: 'w-full' }}
                listenerKey={'popover'}
                textAccessor={nameAccessor}
                textSetter={nameSetter}
                {...props}
              />
            );
          }}
        />
        <div className={'flex justify-center gap-2'}>
          <Chip size={'sm'} color={'secondary'}>
            {currentAllocationSum}
          </Chip>
          Periods this bundle
        </div>
      </div>
      <Listbox
        items={items}
        selectedKeys={currentState.workProjectSeriesSchemaIds}
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
            <BundleItemWithInclusionCount id={listboxItem.id} />
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
}

'use client';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { DtoUiWrapper, useDtoStore } from 'dto-stores';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import React, { useMemo } from 'react';
import BundleItemWithInclusionCount from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_components/BundleItemWithInclusionCount';
import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/sum-delivery-allocations';
import { EntityClassMap } from '@/api/entity-class-map';
import { Chip } from '@nextui-org/chip';
import { useItemChooserMap } from '@/hooks/useItemChooserMap';
import { CollectionItemChooserProps } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_functions/collectionItemChooserProps';
import { useListboxSelectionChangeCallback } from '@/hooks/useListboxSelectionChangeCallback';
import {
  EditTextDeleteEntityPopover,
  EditTextDeletePopoverProps
} from '@/components/generic/EditTextDeleteEntityPopover';
import { nameAccessor, nameSetter } from '@/components/modals/nameSetter';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { isNotUndefined } from '@/api/main';

const produceBundle = (
  updatedKeys: string[],
  bundle: WorkSeriesSchemaBundleDto
): WorkSeriesSchemaBundleDto => {
  const updatedKeySet = new Set(updatedKeys);
  const idSet = new Set<string>();
  const updatedItems = [];
  for (let workSeriesBundleItem of bundle.workSeriesBundleItems) {
    if (
      updatedKeySet.has(workSeriesBundleItem.workProjectSeriesSchemaId) &&
      !idSet.has(workSeriesBundleItem.workProjectSeriesSchemaId)
    ) {
      updatedItems.push(workSeriesBundleItem);
      idSet.add(workSeriesBundleItem.workProjectSeriesSchemaId);
    }
  }
  return {
    ...bundle,
    workProjectSeriesSchemaIds: updatedKeys,
    workSeriesBundleItems: updatedItems
  };
};

export default function BundleItemChooser({
  collectionId,
  entityClass,
  referencedItemContextKeys
}: CollectionItemChooserProps) {
  const { entity, dispatchWithoutControl, deleted, dispatchDeletion } =
    useDtoStore<WorkSeriesSchemaBundleDto>({
      entityId: collectionId,
      entityClass,
      listenerKey: 'itemChooser'
    });

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
    const workProjectSeriesSchemaDtos = entity.workProjectSeriesSchemaIds
      .map((id) =>
        schemaMap.get(`${EntityClassMap.workProjectSeriesSchema}:${id}`)
      )
      .filter(isNotUndefined);
    console.log(workProjectSeriesSchemaDtos);
    return sumAllSchemas(workProjectSeriesSchemaDtos);
  }, [entity, schemaMap]);

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
        <DtoUiWrapper<
          WorkSeriesSchemaBundleDto,
          EditTextDeletePopoverProps<WorkSeriesSchemaBundleDto>
        >
          entityClass={entityClass}
          entityId={collectionId}
          stringKey={'name'}
          classNames={{ button: 'w-full' }}
          renderAs={EditTextDeleteEntityPopover<WorkSeriesSchemaBundleDto>}
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
        selectedKeys={entity.workProjectSeriesSchemaIds}
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

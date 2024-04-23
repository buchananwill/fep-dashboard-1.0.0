'use client';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { useDtoStoreDispatch } from 'dto-stores';
import { WorkSeriesSchemaBundleDto } from '@/app/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import {
  ObjectPlaceholder,
  useSelectiveContextListenerGroupGlobal
} from 'selective-context';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import React, { Key, useMemo } from 'react';
import BundleItemWithInclusionCount from '@/app/work-project-series-schemas/bundles/components/BundleItemWithInclusionCount';
import { sumAllSchemas } from '@/app/work-project-series-schemas/functions/sum-delivery-allocations';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { Chip } from '@nextui-org/chip';

export interface CollectionItemChooserProps {
  collectionId: string | number;
  entityClass: string;
  referencedItemContextKeys: string[];
}

export default function BundleItemChooser({
  collectionId,
  entityClass,
  referencedItemContextKeys
}: CollectionItemChooserProps) {
  const { currentState, dispatchWithoutControl } =
    useDtoStoreDispatch<WorkSeriesSchemaBundleDto>(
      collectionId,
      entityClass,
      'itemChooser'
    );
  const { currentState: schemaMap } =
    useSelectiveContextListenerGroupGlobal<WorkProjectSeriesSchemaDto>({
      contextKeys: referencedItemContextKeys,
      listenerKey: `bundleItemChooser:${collectionId}`,
      initialValue: ObjectPlaceholder
    });

  const items = useMemo(() => {
    return referencedItemContextKeys
      .map((cKey) => schemaMap[cKey])
      .filter((schema) => schema !== undefined)
      .map((schema) => schema as WorkProjectSeriesSchemaDto);
  }, [referencedItemContextKeys, schemaMap]);

  const handleAction = (key: Set<Key> | 'all') => {
    console.log(key);
    dispatchWithoutControl((bundle) => {
      const updatedKeys = [...key].map((nextKey) => `${nextKey}`);
      return {
        ...bundle,
        workProjectSeriesSchemaIds: updatedKeys
      };
    });
  };

  const currentAllocationSum = useMemo(() => {
    const workProjectSeriesSchemaDtos =
      currentState.workProjectSeriesSchemaIds.map(
        (id) => schemaMap[`${EntityNamesMap.workProjectSeriesSchema}:${id}`]
      );
    return sumAllSchemas(workProjectSeriesSchemaDtos);
  }, [currentState, schemaMap]);

  return (
    <div className={'flex flex-col'}>
      <div className={'flex justify-between items-baseline mb-2'}>
        <span>{currentState.name}</span>{' '}
        <span>
          <Chip size={'sm'} color={'secondary'}>
            {currentAllocationSum}
          </Chip>
          Periods this bundle
        </span>
      </div>
      <Listbox
        items={items}
        selectedKeys={currentState.workProjectSeriesSchemaIds}
        selectionMode={'multiple'}
        variant={'bordered'}
        aria-label={'Select Bundle Items'}
        label={'Select Bundle Items'}
        onSelectionChange={(keys) => handleAction(keys)}
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

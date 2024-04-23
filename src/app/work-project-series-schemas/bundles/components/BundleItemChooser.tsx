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

  return (
    <Listbox
      items={items}
      selectedKeys={currentState.workProjectSeriesSchemaIds}
      selectionMode={'multiple'}
      variant={'bordered'}
      aria-label={'Select Bundle Items'}
      label={'Select Bundle Items'}
      onSelectionChange={(keys) => handleAction(keys)}
    >
      {(listboxItem) => (
        <ListboxItem
          key={listboxItem.id}
          classNames={{ base: 'data-[selected=true]:bg-emerald-100' }}
        >
          {listboxItem.name}
        </ListboxItem>
      )}
    </Listbox>
  );
}

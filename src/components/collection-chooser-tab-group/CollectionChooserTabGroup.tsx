'use client';

import { FC, useMemo } from 'react';
import { CollectionItemChooserProps } from '@/components/types/collectionItemChooserProps';
import InnerWrapper from '@/components/collection-chooser-tab-group/InnerWrapper';
import {
  EditAddDeleteDtoControllerArray,
  MasterMapController
} from 'dto-stores';
import { HasId } from '@/api/types';
import { HasName } from 'react-d3-force-wrapper';

export interface CollectionChooserTabGroupProps<T, U> {
  collectionData: T[];
  referencedItemData: U[];
  referencedEntityClass: string;
  collectionEntityClass: string;
  collectionItemChooser: FC<CollectionItemChooserProps>;
  updateServerAction?: (entityList: T[]) => Promise<any>;
  deleteServerAction?: (idList: any[]) => Promise<any>;
  postServerAction?: (entityList: T[]) => Promise<any>;
  getServerAction?: (idList: U[]) => Promise<T[]>;
}

export default function CollectionChooserTabGroup<
  T extends HasId & HasName,
  U extends HasId
>({
  referencedItemData,
  referencedEntityClass,
  collectionEntityClass,
  collectionItemChooser: ItemChooser
}: CollectionChooserTabGroupProps<T, U>) {
  const { itemContextKeys, itemIdList } = useMemo(() => {
    const itemIdList = referencedItemData.map((item) => `${item.id}`);
    const itemContextKeys = referencedItemData.map(
      (item) => `${referencedEntityClass}:${item.id}`
    );
    return { itemContextKeys, itemIdList };
  }, [referencedItemData, referencedEntityClass]);

  return (
    <>
      <MasterMapController entityClass={collectionEntityClass} />
      <EditAddDeleteDtoControllerArray
        entityClass={referencedEntityClass}
        dtoList={referencedItemData}
      />
      <InnerWrapper
        collectionItemChooser={ItemChooser}
        itemContextKeys={itemContextKeys}
        collectionEntityClass={collectionEntityClass}
      />
    </>
  );
}

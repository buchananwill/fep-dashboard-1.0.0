'use client';

import { FC, useMemo } from 'react';
import { CollectionItemChooserProps } from '@/components/types/collectionItemChooserProps';
import { HasNameDto } from '@/api/zod-schemas/HasNameDtoSchema';
import InnerWrapper from '@/components/collection-chooser-tab-group/InnerWrapper';
import {
  EditAddDeleteDtoControllerArray,
  MasterMapController
} from 'dto-stores';
import { HasId } from '@/api/types';

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
  T extends HasId & HasNameDto,
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

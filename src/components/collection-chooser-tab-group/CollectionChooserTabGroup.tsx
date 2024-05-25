'use client';

import { FC, useMemo } from 'react';
import { CollectionItemChooserProps } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_functions/collectionItemChooserProps';
import { HasId } from '@/api/main';
import { HasNameDto } from '@/api/dtos/HasNameDtoSchema';
import InnerWrapper from '@/components/collection-chooser-tab-group/InnerWrapper';
import {
  DtoControllerArray,
  EditAddDeleteController,
  EditAddDeleteDtoControllerArray,
  MasterMapController
} from 'dto-stores';

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
  collectionData,
  referencedItemData,
  referencedEntityClass,
  collectionEntityClass,
  collectionItemChooser: ItemChooser,
  ...serverActions
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

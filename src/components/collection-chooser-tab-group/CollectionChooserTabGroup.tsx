'use client';

import { DtoControllerArray, DtoGroupMapController } from 'dto-stores';
import { FC, useMemo } from 'react';
import { CollectionItemChooserProps } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_functions/collectionItemChooserProps';
import { HasId } from '@/app/api/main';
import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';
import InnerWrapper from '@/components/collection-chooser-tab-group/InnerWrapper';
import { DtoControllerArrayChangesTracker } from '@/components/generic/DtoChangesTracker';

export interface CollectionChooserTabGroupProps<T, U> {
  collectionData: T[];
  referencedItemData: U[];
  referencedEntityClass: string;
  collectionEntityClass: string;
  collectionItemChooser: FC<CollectionItemChooserProps>;
  updateServerAction?: (entityList: T[]) => Promise<any>;
  deleteServerAction?: (idList: any[]) => Promise<any>;
  postServerAction?: (entityList: T[]) => Promise<any>;
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
  const itemContextKeys = useMemo(() => {
    return referencedItemData.map(
      (item) => `${referencedEntityClass}:${item.id}`
    );
  }, [referencedItemData, referencedEntityClass]);

  return (
    <>
      <DtoControllerArrayChangesTracker
        dtoList={collectionData}
        entityName={collectionEntityClass}
        {...serverActions}
      />
      <DtoControllerArray
        dtoList={referencedItemData}
        entityName={referencedEntityClass}
      />
      <DtoGroupMapController entityClass={collectionEntityClass} />
      <InnerWrapper
        collectionItemChooser={ItemChooser}
        itemContextKeys={itemContextKeys}
        collectionEntityClass={collectionEntityClass}
      />
    </>
  );
}

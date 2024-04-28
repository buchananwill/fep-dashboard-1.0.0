'use client';

import { Tab, Tabs } from '@nextui-org/tabs';
import { WorkSeriesSchemaBundleDto } from '@/app/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { DtoControllerArray, DtoGroupMapController } from 'dto-stores';
import { EntityClassMap } from '@/app/api/entity-class-map';
import BundleItemChooser from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/BundleItemChooser';
import { FC, useMemo } from 'react';
import BundleItemWithInclusionCount from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/BundleItemWithInclusionCount';
import AllBundlesTotal from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/AllBundlesTotal';
import { CollectionItemChooserProps } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/collectionItemChooserProps';
import { HasId } from '@/app/api/main';
import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';
import InnerWrapper from '@/components/collection-chooser-tab-group/InnerWrapper';

export interface CollectionChooserTabGroupProps<T, U> {
  collectionData: T[];
  referencedItemData: U[];
  referencedEntityClass: string;
  collectionEntityClass: string;
  collectionItemChooser: FC<CollectionItemChooserProps>;
}

export default function CollectionChooserTabGroup<
  T extends HasId & HasNameDto,
  U extends HasId
>({
  collectionData,
  referencedItemData,
  referencedEntityClass,
  collectionEntityClass,
  collectionItemChooser: ItemChooser
}: CollectionChooserTabGroupProps<T, U>) {
  const itemContextKeys = useMemo(() => {
    return referencedItemData.map(
      (item) => `${referencedEntityClass}:${item.id}`
    );
  }, [referencedItemData, referencedEntityClass]);

  return (
    <>
      <DtoControllerArray
        dtoList={collectionData}
        entityName={collectionEntityClass}
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

'use client';

import { Tab, Tabs } from '@nextui-org/tabs';
import { WorkSeriesSchemaBundleDto } from '@/app/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { DtoControllerArray } from 'dto-stores';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import BundleItemChooser from '@/app/work-project-series-schemas/bundles/components/BundleItemChooser';
import { useMemo } from 'react';

interface BundleTabGroupProps<T, U> {
  collectionData: T[];
  referencedItemData: U[];
}

const entityName = EntityNamesMap.workSeriesSchemaBundle;
export default function BundleTabGroup({
  collectionData,
  referencedItemData
}: BundleTabGroupProps<WorkSeriesSchemaBundleDto, WorkProjectSeriesSchemaDto>) {
  const itemContextKeys = useMemo(() => {
    return referencedItemData.map(
      (item) => `${EntityNamesMap.workProjectSeriesSchema}:${item.id}`
    );
  }, [referencedItemData]);

  return (
    <>
      <DtoControllerArray dtoList={collectionData} entityName={entityName} />
      <DtoControllerArray
        dtoList={referencedItemData}
        entityName={EntityNamesMap.workProjectSeriesSchema}
      />
      <Tabs
        aria-label={'bundle tabs'}
        size={'lg'}
        items={collectionData}
        isVertical={true}
      >
        {(item) => (
          <Tab key={item.id} title={item.name}>
            <BundleItemChooser
              collectionId={item.id}
              entityClass={entityName}
              referencedItemContextKeys={itemContextKeys}
            />
          </Tab>
        )}
      </Tabs>
    </>
  );
}

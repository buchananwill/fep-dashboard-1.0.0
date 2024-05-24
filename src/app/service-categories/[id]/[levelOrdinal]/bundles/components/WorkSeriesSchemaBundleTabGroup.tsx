'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/components/collection-chooser-tab-group/CollectionChooserTabGroup';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import BundleItemChooser from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/BundleItemChooser';
import { useContext } from 'react';
import { SelectiveContextGlobal } from 'selective-context/dist/creators/selectiveContextCreatorGlobal';

export default function WorkSeriesSchemaBundleTabGroup(
  props: Omit<
    CollectionChooserTabGroupProps<
      WorkSeriesSchemaBundleDto,
      WorkProjectSeriesSchemaDto
    >,
    'collectionItemChooser'
  >
) {
  const mutableRefObject = useContext(
    SelectiveContextGlobal.latestValueRefContext
  );

  console.log(mutableRefObject);

  return (
    <CollectionChooserTabGroup
      {...props}
      collectionItemChooser={BundleItemChooser}
    />
  );
}

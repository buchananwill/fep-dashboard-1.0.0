'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/components/collection-chooser-tab-group/CollectionChooserTabGroup';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import BundleItemChooser from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/BundleItemChooser';

export default function WorkSeriesSchemaBundleTabGroup(
  props: Omit<
    CollectionChooserTabGroupProps<
      WorkSeriesSchemaBundleDto,
      WorkProjectSeriesSchemaDto
    >,
    'collectionItemChooser'
  >
) {
  return (
    <CollectionChooserTabGroup
      {...props}
      collectionItemChooser={BundleItemChooser}
    />
  );
}

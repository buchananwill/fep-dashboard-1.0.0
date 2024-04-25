'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/components/collection-chooser-tab-group/CollectionChooserTabGroup';
import { WorkSeriesSchemaBundleDto } from '@/app/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import BundleItemChooser from '@/app/work-project-series-schemas/bundles/components/BundleItemChooser';

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

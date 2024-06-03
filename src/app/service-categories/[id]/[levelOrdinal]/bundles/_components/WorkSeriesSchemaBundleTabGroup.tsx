'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/components/collection-chooser-tab-group/CollectionChooserTabGroup';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import BundleItemChooser from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_components/BundleItemChooser';
import { ArrayPlaceholder } from 'selective-context';
import { NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';

export default function WorkSeriesSchemaBundleTabGroup(
  props: Omit<
    CollectionChooserTabGroupProps<
      WorkSeriesSchemaBundleDto,
      WorkProjectSeriesSchemaDto
    >,
    'collectionItemChooser' | 'collectionData'
  >
) {
  const { currentState } = NamespacedHooks.useListen(
    props.collectionEntityClass,
    KEY_TYPES.MASTER_LIST,
    'tab-group-wrapper',
    ArrayPlaceholder
  );

  return (
    <CollectionChooserTabGroup
      collectionData={currentState}
      {...props}
      collectionItemChooser={BundleItemChooser}
    />
  );
}

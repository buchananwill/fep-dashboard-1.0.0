'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/components/collection-chooser-tab-group/CollectionChooserTabGroup';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import BundleItemChooser from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/BundleItemChooser';
import { ArrayPlaceholder, useGlobalListener } from 'selective-context';
import { getNameSpacedKey } from 'dto-stores';
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
  const { currentState } = useGlobalListener({
    contextKey: getNameSpacedKey(
      props.collectionEntityClass,
      KEY_TYPES.MASTER_LIST
    ),
    listenerKey: 'tab-group-wrapper',
    initialValue: ArrayPlaceholder
  });

  return (
    <CollectionChooserTabGroup
      collectionData={currentState}
      {...props}
      collectionItemChooser={BundleItemChooser}
    />
  );
}

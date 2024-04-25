'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/components/collection-chooser-tab-group/CollectionChooserTabGroup';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { CarouselGroupDto } from '@/app/api/dtos/CarouselGroupDtoSchema';
import CarouselGroupOptionChooser from '@/app/work-project-series-schemas/carousel-groups/components/CarouselGroupOptionChooser';
import { useSelectiveContextGlobalController } from 'selective-context';

export default function CarouselGroupTabGroup({
  collectionData,
  ...otherProps
}: Omit<
  CollectionChooserTabGroupProps<CarouselGroupDto, WorkProjectSeriesSchemaDto>,
  'collectionItemChooser'
>) {
  const { currentState: collectionDataState } =
    useSelectiveContextGlobalController<CarouselGroupDto[]>({
      contextKey: `${otherProps.collectionEntityClass}:masterList`,
      listenerKey: 'tabGroup',
      initialValue: collectionData
    });

  return (
    <CollectionChooserTabGroup
      collectionData={collectionDataState}
      {...otherProps}
      collectionItemChooser={CarouselGroupOptionChooser}
    />
  );
}

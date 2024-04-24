'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/app/work-project-series-schemas/components/CollectionChooserTabGroup';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { CarouselGroupDto } from '@/app/api/dtos/CarouselGroupDtoSchema';
import CarouselGroupOptionChooser from '@/app/work-project-series-schemas/carousel-groups/components/CarouselGroupOptionChooser';

export default function CarouselGroupTabGroup(
  props: Omit<
    CollectionChooserTabGroupProps<
      CarouselGroupDto,
      WorkProjectSeriesSchemaDto
    >,
    'collectionItemChooser'
  >
) {
  return (
    <CollectionChooserTabGroup
      {...props}
      collectionItemChooser={CarouselGroupOptionChooser}
    />
  );
}

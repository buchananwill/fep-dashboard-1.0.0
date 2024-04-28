'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/components/collection-chooser-tab-group/CollectionChooserTabGroup';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { CarouselGroupDto } from '@/app/api/dtos/CarouselGroupDtoSchema';
import CarouselGroupOptionChooser from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/components/CarouselGroupOptionChooser';
import { useSelectiveContextGlobalController } from 'selective-context';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { Button } from '@nextui-org/button';
import React from 'react';

export default function CarouselGroupTabGroup({
  collectionData,
  knowledgeLevel,
  ...otherProps
}: Omit<
  CollectionChooserTabGroupProps<CarouselGroupDto, WorkProjectSeriesSchemaDto>,
  'collectionItemChooser'
> & { knowledgeLevel: KnowledgeLevelDto }) {
  const { currentState: collectionDataState, dispatch } =
    useSelectiveContextGlobalController<CarouselGroupDto[]>({
      contextKey: `${otherProps.collectionEntityClass}:masterList`,
      listenerKey: 'tabGroup',
      initialValue: collectionData
    });

  const handleAddGroup = () => {
    const newCarousel: CarouselGroupDto = {
      id: crypto.randomUUID(),
      name: `New Carousel ${collectionDataState.length}`,
      carousels: [],
      carouselGroupOptions: [],
      knowledgeLevel: knowledgeLevel
    };
    dispatch((list) => [...list, newCarousel]);
  };

  return (
    <Card className={'w-fit'}>
      <CardHeader className={'flex'}>
        <Button onPress={handleAddGroup}>Add Carousel Group</Button>
        <div className={'grow text-center'}>
          Carousel Groups Year {knowledgeLevel.levelOrdinal}{' '}
        </div>
      </CardHeader>
      <CardBody>
        <CollectionChooserTabGroup
          collectionData={collectionDataState}
          {...otherProps}
          collectionItemChooser={CarouselGroupOptionChooser}
        />
      </CardBody>
    </Card>
  );
}

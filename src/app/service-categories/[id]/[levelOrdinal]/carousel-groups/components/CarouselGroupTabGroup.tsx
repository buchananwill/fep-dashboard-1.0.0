'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/components/collection-chooser-tab-group/CollectionChooserTabGroup';
import CarouselGroupOptionChooser from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/components/CarouselGroupOptionChooser';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

import { Button } from '@nextui-org/button';
import React, { Dispatch, SetStateAction } from 'react';
import { useMasterListController } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_functions/useMasterListController';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';

function handleAddGroup(
  dispatch: Dispatch<SetStateAction<CarouselGroupDto[]>>,
  level: KnowledgeLevelDto,
  dispatchWithoutControl: Dispatch<SetStateAction<string[]>>
) {
  let newCarousel: CarouselGroupDto;
  dispatch((list) => {
    newCarousel = {
      id: crypto.randomUUID(),
      name: `New Carousel ${list.length}`,
      carousels: [],
      carouselGroupOptions: [],
      knowledgeLevel: level
    };
    return [...list, newCarousel];
  });
  dispatchWithoutControl((list) => [...list, newCarousel.id]);
}

export default function CarouselGroupTabGroup({
  collectionData,
  knowledgeLevel,
  ...otherProps
}: Omit<
  CollectionChooserTabGroupProps<CarouselGroupDto, WorkProjectSeriesSchemaDto>,
  'collectionItemChooser'
> & { knowledgeLevel: KnowledgeLevelDto }) {
  const collectionEntityClass = otherProps.collectionEntityClass;

  const {
    currentState: collectionDataState,
    dispatch,
    dispatchWithoutControl
  } = useMasterListController<CarouselGroupDto, string>(
    collectionData,
    collectionEntityClass
  );

  return (
    <Card className={'w-fit'}>
      <CardHeader className={'flex'}>
        <Button
          onPress={() =>
            handleAddGroup(dispatch, knowledgeLevel, dispatchWithoutControl)
          }
        >
          Add Carousel Group
        </Button>
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

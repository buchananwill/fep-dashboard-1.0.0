'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/components/collection-chooser-tab-group/CollectionChooserTabGroup';
import CarouselGroupOptionChooser from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/components/CarouselGroupOptionChooser';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

import { Button } from '@nextui-org/button';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { DispatchList } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/SchemaBundleViewer';
import { useMasterListInteraction } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/useMasterListInteraction';
import { ArrayPlaceholder, useGlobalListener } from 'selective-context';
import { getNameSpacedKey } from 'dto-stores/dist/functions/getNameSpacedKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';

function handleAddGroup(
  dispatch: Dispatch<SetStateAction<CarouselGroupDto[]>>,
  dispatchWithoutControl: Dispatch<SetStateAction<string[]>>,
  level: KnowledgeLevelDto
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

  const curriedCallback = useCallback(
    (
      dispatchMasterList: DispatchList<any>,
      dispatchAddedList: DispatchList<any>
    ) => handleAddGroup(dispatchMasterList, dispatchAddedList, knowledgeLevel),
    [knowledgeLevel]
  );

  const handleOnPress = useMasterListInteraction(
    collectionEntityClass,
    (dispatch, dispatchWithoutListen) =>
      curriedCallback(dispatch, dispatchWithoutListen)
  );

  const { currentState: collectionDataState } = useGlobalListener({
    contextKey: getNameSpacedKey(collectionEntityClass, KEY_TYPES.MASTER_LIST),
    listenerKey: 'carousel-tab-group',
    initialValue: ArrayPlaceholder
  });

  return (
    <Card className={'w-fit'}>
      <EditAddDeleteDtoControllerArray
        entityClass={collectionEntityClass}
        dtoList={collectionData}
      />
      <CardHeader className={'flex'}>
        <Button onPress={handleOnPress}>Add Carousel Group</Button>
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

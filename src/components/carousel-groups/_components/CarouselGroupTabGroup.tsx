'use client';
import CollectionChooserTabGroup, {
  CollectionChooserTabGroupProps
} from '@/components/collection-chooser-tab-group/CollectionChooserTabGroup';
import CarouselGroupOptionChooser from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/_components/CarouselGroupOptionChooser';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

import { Button } from '@nextui-org/button';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { CarouselGroupDto } from '@/api/zod-schemas/CarouselGroupDtoSchema';
import { KnowledgeLevelDto } from '@/api/zod-schemas/KnowledgeLevelDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema';
import {
  EditAddDeleteDtoControllerArray,
  NamespacedHooks,
  useMasterListInteraction
} from 'dto-stores';
import { ArrayPlaceholder } from 'selective-context';

import { KEY_TYPES } from 'dto-stores/dist/literals';

import { DispatchList } from '@/types';

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
  deleteServerAction,
  postServerAction,
  updateServerAction,
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

  const { currentState: collectionDataState } = NamespacedHooks.useListen(
    collectionEntityClass,
    KEY_TYPES.MASTER_LIST,
    'carousel-tab-group',
    ArrayPlaceholder
  );

  return (
    <Card className={'w-fit'}>
      <EditAddDeleteDtoControllerArray
        entityClass={collectionEntityClass}
        dtoList={collectionData}
        {...{ deleteServerAction, postServerAction, updateServerAction }}
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

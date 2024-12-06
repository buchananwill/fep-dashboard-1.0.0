'use client';
import { Button, Tabs } from '@mantine/core';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { NamespacedHooks, useMasterListInteraction } from 'dto-stores';
import { ArrayPlaceholder } from 'selective-context';

import { KEY_TYPES } from 'dto-stores/dist/literals';

import { DispatchList } from '@/types';
import CarouselGroupEditor from '@/components/carousel-groups/_components/CarouselGroupEditor';
import {
  CarouselGroupDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types_';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';

function getTabValue(item: CarouselGroupDto) {
  return `carouselGroup-${item.id}`;
}

export default function CarouselGroupTabGroup({
  knowledgeLevel,
  ...otherProps
}: {
  referencedEntityClass: string;
  collectionEntityClass: string;
  knowledgeLevel: KnowledgeLevelDto;
}) {
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

  const { currentState: collectionDataState } = NamespacedHooks.useListen<
    CarouselGroupDto[]
  >(
    collectionEntityClass,
    KEY_TYPES.MASTER_LIST,
    'carousel-tab-group',
    ArrayPlaceholder
  );

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex'}>
        <Button onClick={handleOnPress}>Add Carousel Group</Button>
        <div className={'grow text-center'}>
          Carousel Groups Year {knowledgeLevel.levelOrdinal}{' '}
        </div>
      </div>
      <div>
        <Tabs
          keepMounted={false}
          defaultValue={
            collectionDataState.length > 0
              ? getTabValue(collectionDataState[0])
              : null
          }
        >
          <Tabs.List>
            {collectionDataState.map((item) => (
              <Tabs.Tab key={item.id} value={getTabValue(item)}>
                {item.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {collectionDataState.map((item) => (
            <Tabs.Panel key={item.id} value={getTabValue(item)}>
              <CarouselGroupEditor collectionId={item.id} />
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function handleAddGroup(
  dispatch: Dispatch<SetStateAction<CarouselGroupDto[]>>,
  dispatchWithoutControl: Dispatch<SetStateAction<number[]>>,
  level: KnowledgeLevelDto
) {
  let carouselGroupDto: CarouselGroupDto;
  dispatch((list) => {
    carouselGroupDto = {
      id: idDecrementer(),
      name: `New Carousel Group ${list.length}`,
      carousels: [],
      carouselGroupOptions: [],
      knowledgeLevel: level
    };
    return [...list, carouselGroupDto];
  });
  dispatchWithoutControl((list) => [...list, carouselGroupDto.id]);
}

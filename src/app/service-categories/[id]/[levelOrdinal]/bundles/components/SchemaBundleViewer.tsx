'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/card';
import AllBundlesTotal from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/AllBundlesTotal';
import WorkSeriesSchemaBundleTabGroup from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/WorkSeriesSchemaBundleTabGroup';
import { EntityClassMap } from '@/api/entity-class-map';
import { Button } from '@nextui-org/button';
import React, { useCallback, useContext } from 'react';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import {
  deleteIdList,
  postList,
  putList
} from '@/api/generated-actions/WorkSeriesSchemaBundle';
import {
  EditAddDeleteDtoControllerArray,
  useMasterListInteraction
} from 'dto-stores';
import { SelectiveContextGlobal } from 'selective-context/dist/creators/selectiveContextCreatorGlobal';

export type DispatchList<T> = React.Dispatch<React.SetStateAction<T[]>>;

const handleAddBundle = (
  dispatchMasterList: React.Dispatch<
    React.SetStateAction<WorkSeriesSchemaBundleDto[]>
  >,
  dispatchAddedList: React.Dispatch<React.SetStateAction<string[]>>,
  level: KnowledgeLevelDto
) => {
  console.log('making new bundle!');
  let newBundle: WorkSeriesSchemaBundleDto;
  const nextId = crypto.randomUUID();

  dispatchMasterList((list) => {
    newBundle = {
      knowledgeLevel: level,
      id: nextId,
      name: `Bundle Year ${level.levelOrdinal} ${list.length + 1}`,
      workProjectSeriesSchemaIds: [],
      workSeriesBundleItems: []
    };
    return [...list, newBundle];
  });

  dispatchAddedList((list) => [...list, nextId]);
};

const collectionEntityClass = EntityClassMap.workSeriesSchemaBundle;

export function SchemaBundleViewer({
  collectionData,
  knowledgeLevel,
  referencedItemData
}: {
  knowledgeLevel: KnowledgeLevelDto;
  collectionData: WorkSeriesSchemaBundleDto[];
  referencedItemData: WorkProjectSeriesSchemaDto[];
}) {
  const curriedCallback = useCallback(
    (
      dispatchMasterList: DispatchList<any>,
      dispatchAddedList: DispatchList<any>
    ) => handleAddBundle(dispatchMasterList, dispatchAddedList, knowledgeLevel),
    [knowledgeLevel]
  );

  const mutableRefObject = useContext(
    SelectiveContextGlobal.latestValueRefContext
  );
  const listeners = useContext(SelectiveContextGlobal.listenersRefContext);

  console.log(mutableRefObject, listeners);

  const handleOnPress = useMasterListInteraction(
    collectionEntityClass,
    (dispatch, dispatchWithoutListen) =>
      curriedCallback(dispatch, dispatchWithoutListen)
  );

  return (
    <Card className={'w-fit'}>
      <EditAddDeleteDtoControllerArray
        entityClass={collectionEntityClass}
        dtoList={collectionData}
        updateServerAction={putList}
        postServerAction={postList}
        deleteServerAction={deleteIdList}
      />
      <CardHeader className={'flex justify-between'}>
        <Button onPress={handleOnPress}>Add Bundle</Button>
        <span>Bundles Year {knowledgeLevel.levelOrdinal} </span>
        <span>
          <AllBundlesTotal /> Periods All Bundles
        </span>
      </CardHeader>
      <CardBody>
        <WorkSeriesSchemaBundleTabGroup
          referencedItemData={referencedItemData}
          collectionEntityClass={collectionEntityClass}
          referencedEntityClass={EntityClassMap.workProjectSeriesSchema}
        />
      </CardBody>
    </Card>
  );
}

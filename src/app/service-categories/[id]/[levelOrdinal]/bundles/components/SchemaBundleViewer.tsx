'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/card';
import AllBundlesTotal from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/AllBundlesTotal';
import WorkSeriesSchemaBundleTabGroup from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/WorkSeriesSchemaBundleTabGroup';
import { EntityClassMap } from '@/api/entity-class-map';
import { Button } from '@nextui-org/button';
import { Dispatch, SetStateAction } from 'react';

import { useMasterListController } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_functions/useMasterListController';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import {
  deleteIdList,
  postList,
  putList
} from '@/api/generated-actions/WorkSeriesSchemaBundle';
import { useMasterListControllerAddDelete } from 'dto-stores/dist/hooks/internal/useMasterListControllerAddDelete';

const handleAddBundle = (
  dispatch: Dispatch<SetStateAction<WorkSeriesSchemaBundleDto[]>>,
  level: KnowledgeLevelDto,
  nextId: string,
  dispatchWithoutControl: Dispatch<SetStateAction<string[]>>
) => {
  let newBundle: WorkSeriesSchemaBundleDto;

  dispatch((list) => {
    newBundle = {
      knowledgeLevel: level,
      id: nextId,
      name: `Bundle Year ${level.levelOrdinal} ${list.length + 1}`,
      workProjectSeriesSchemaIds: [],
      workSeriesBundleItems: []
    };
    return [...list, newBundle];
  });
  dispatchWithoutControl((list) => [...list, nextId]);
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
  const { masterList, dispatch, dispatchWithoutControl } =
    useMasterListControllerAddDelete<WorkSeriesSchemaBundleDto, string>(
      collectionData,
      collectionEntityClass
    );

  return (
    <Card className={'w-fit'}>
      <CardHeader className={'flex justify-between'}>
        <Button
          onPress={() =>
            handleAddBundle(
              dispatch,
              knowledgeLevel,
              crypto.randomUUID(),
              dispatchWithoutControl
            )
          }
        >
          Add Bundle
        </Button>
        <span>Bundles Year {knowledgeLevel.levelOrdinal} </span>
        <span>
          <AllBundlesTotal /> Periods All Bundles
        </span>
      </CardHeader>
      <CardBody>
        <WorkSeriesSchemaBundleTabGroup
          collectionData={masterList}
          referencedItemData={referencedItemData}
          collectionEntityClass={collectionEntityClass}
          referencedEntityClass={EntityClassMap.workProjectSeriesSchema}
          updateServerAction={putList}
          postServerAction={postList}
          deleteServerAction={deleteIdList}
        />
      </CardBody>
    </Card>
  );
}

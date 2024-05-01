'use client';
import { WorkSeriesSchemaBundleDto } from '@/app/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import AllBundlesTotal from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/AllBundlesTotal';
import WorkSeriesSchemaBundleTabGroup from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/WorkSeriesSchemaBundleTabGroup';
import { EntityClassMap } from '@/app/api/entity-class-map';
import {
  ArrayPlaceholder,
  useSelectiveContextGlobalController,
  useSelectiveContextGlobalDispatch
} from 'selective-context';
import { getMasterListContextKey } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/components/CarouselGroupTabGroup';
import { Button } from '@nextui-org/button';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { TransientIdOffset } from '@/app/api/main';
import {
  deleteIdList,
  postList,
  putList
} from '@/app/api/generated-actions/WorkSeriesSchemaBundle';
import { getDeletedContextKey } from 'dto-stores/dist/functions/getDeletedContextKey';
import { getAddedContextKey } from 'dto-stores/dist/functions/getAddedContextKey';

const handleAddBundle = (
  dispatch: Dispatch<SetStateAction<WorkSeriesSchemaBundleDto[]>>,
  level: KnowledgeLevelDto,
  nextId: number,
  dispatchWithoutControl: Dispatch<SetStateAction<number[]>>
) => {
  const id = nextId + TransientIdOffset;
  const newBundle: WorkSeriesSchemaBundleDto = {
    knowledgeLevel: level,
    id: id,
    name: `Bundle Year ${level.levelOrdinal} ${nextId}`,
    workProjectSeriesSchemaIds: [],
    workSeriesBundleItems: []
  };
  dispatch((list) => [...list, newBundle]);
  dispatchWithoutControl((list) => [...list, id]);
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
  const { currentState, dispatch } = useSelectiveContextGlobalController({
    contextKey: getMasterListContextKey(collectionEntityClass),
    listenerKey: 'bundleViewer',
    initialValue: collectionData
  });

  const {
    currentState: deletedIdList,
    dispatchWithoutControl: dispatchDeleted
  } = useSelectiveContextGlobalDispatch<number[]>({
    contextKey: getDeletedContextKey(collectionEntityClass),
    listenerKey: 'card',
    initialValue: ArrayPlaceholder
  });

  const { dispatchWithoutControl, currentState: transientIdList } =
    useSelectiveContextGlobalDispatch<number[]>({
      contextKey: getAddedContextKey(collectionEntityClass),
      listenerKey: 'card',
      initialValue: ArrayPlaceholder
    });

  useEffect(() => {
    const transientAndDeleted = deletedIdList.filter(
      (id) => id >= TransientIdOffset
    );
    if (transientAndDeleted.length > 0) {
      dispatch((list) =>
        list.filter((bundle) => !transientAndDeleted.includes(bundle.id))
      );
      dispatchDeleted((list) =>
        list.filter((id) => !deletedIdList.includes(id))
      );
      dispatchWithoutControl((list) =>
        list.filter((id) => !deletedIdList.includes(id))
      );
    }
  }, [deletedIdList, dispatch, dispatchWithoutControl, dispatchDeleted]);

  console.log(deletedIdList, transientIdList);

  return (
    <Card className={'w-fit'}>
      <CardHeader className={'flex justify-between'}>
        <Button
          onPress={() =>
            handleAddBundle(
              dispatch,
              knowledgeLevel,
              currentState.length,
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
          collectionData={currentState}
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

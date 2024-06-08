'use client';

import React, { useMemo } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

import { LessonDeliveryModel } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_components/LessonDeliveryModel';

import { EmptyArray } from '@/api/main';
import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/sum-delivery-allocations';
import { useGlobalListener, useGlobalListenerGroup } from 'selective-context';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { DtoUiListAll, useAllDtoComponents } from 'dto-stores';

const entityType = EntityClassMap.workProjectSeriesSchema;
const initialMap = new Map();

export default function WpssEditGridColList() {
  const { currentState: idList } = useGlobalListener({
    contextKey: `${EntityClassMap.workProjectSeriesSchema}:idList`,
    initialValue: EmptyArray,
    listenerKey: 'editList'
  });

  const contextKeys = useMemo(() => {
    return idList.map(
      (id) => `${EntityClassMap.workProjectSeriesSchema}:${id}`
    );
  }, [idList]);

  const { currentState } = useGlobalListenerGroup<WorkProjectSeriesSchemaDto>({
    contextKeys,
    listenerKey: 'editList',
    initialValue: initialMap
  });

  const totalAllocation = useMemo(() => {
    return sumAllSchemas([...currentState.values()]);
  }, [currentState]);

  return (
    <Card>
      <CardHeader>Lesson Delivery Models.</CardHeader>
      <CardBody>
        <div
          className={'grid grid-cols-4 text-center border-b-2 mb-2 divide-x'}
        >
          <div>Name</div>
          <div className={'col-span-2'}>
            Lesson allocation total: {totalAllocation}
          </div>
          <div className={'grid grid-cols-3'}>
            <div>Short code</div>
            <div>Bandwidth</div>
            <div>Student ratio</div>
          </div>
        </div>
        <DtoUiListAll entityClass={entityType} renderAs={LessonDeliveryModel} />
      </CardBody>
    </Card>
  );
}

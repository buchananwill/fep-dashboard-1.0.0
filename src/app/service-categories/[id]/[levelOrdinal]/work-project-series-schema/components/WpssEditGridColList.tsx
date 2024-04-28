'use client';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import React, { useMemo } from 'react';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { DtoComponentArrayGenerator } from 'dto-stores';
import { LessonDeliveryModel } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/components/LessonDeliveryModel';
import {
  useSelectiveContextGlobalListener,
  useSelectiveContextListenerGroupGlobal
} from 'selective-context';
import { EmptyArray, ObjectPlaceholder } from '@/app/api/main';
import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/sum-delivery-allocations';

const entityType = EntityClassMap.workProjectSeriesSchema;

export default function WpssEditGridColList() {
  const { currentState: idList } = useSelectiveContextGlobalListener({
    contextKey: `${EntityClassMap.workProjectSeriesSchema}:idList`,
    initialValue: EmptyArray,
    listenerKey: 'editList'
  });

  const contextKeys = useMemo(() => {
    return idList.map(
      (id) => `${EntityClassMap.workProjectSeriesSchema}:${id}`
    );
  }, [idList]);

  const { currentState } =
    useSelectiveContextListenerGroupGlobal<WorkProjectSeriesSchemaDto>({
      contextKeys,
      listenerKey: 'editList',
      initialValue: ObjectPlaceholder
    });

  const totalAllocation = useMemo(() => {
    return sumAllSchemas(Object.values(currentState));
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
            Lesson allocation. Total: {totalAllocation}
          </div>
          <div className={'grid grid-cols-3'}>
            <div>Short code</div>
            <div>Bandwidth</div>
            <div>Student ratio</div>
          </div>
        </div>
        <DtoComponentArrayGenerator
          entityName={entityType}
          eachAs={LessonDeliveryModel}
        />
      </CardBody>
    </Card>
  );
}

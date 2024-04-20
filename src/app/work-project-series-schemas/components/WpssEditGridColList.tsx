'use client';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { ColumnMetaData } from '@/components/generic/DtoTable';
import React, { useCallback, useContext, useMemo } from 'react';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { DtoComponentArrayGenerator } from 'dto-stores';
import { LessonDeliveryModel } from '@/app/work-project-series-schemas/components/LessonDeliveryModel';
import data from '@/utils/init-json-data/work-project-series-schema/WorkProjectSeriesSchemaSome.json';
import { useSelectiveContextListenerGroupGlobal } from 'selective-context';
import { ObjectPlaceholder } from '@/app/api/main';
import { sumAllSchemas } from '@/app/work-project-series-schemas/functions/sum-delivery-allocations';
import { SelectiveContextGlobal } from 'selective-context/dist/creators/selectiveContextCreatorGlobal';
import WrapperGroup from '@/app/work-project-series-schemas/components/WrapperGroup';

export const contextKeys = data.map(
  (wpss) => `${EntityNamesMap.workProjectSeriesSchema}:${wpss.id}`
);

const entityType = EntityNamesMap.workProjectSeriesSchema;
export interface WpssProps {
  data: WorkProjectSeriesSchemaDto[];
  deliveryAllocationSizes: number[];
}

export default function WpssEditGridColList({
  data,
  deliveryAllocationSizes
}: WpssProps) {
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
      <CardHeader>
        Lesson Delivery Models. Total allocation: {totalAllocation}
      </CardHeader>
      <CardBody>
        <DtoComponentArrayGenerator
          entityName={entityType}
          eachAs={LessonDeliveryModel}
        />{' '}
        <WrapperGroup />
      </CardBody>
    </Card>
  );
}

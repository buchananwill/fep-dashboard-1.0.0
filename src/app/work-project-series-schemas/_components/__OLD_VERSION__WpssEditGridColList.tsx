'use client';

import React, { useMemo } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

import { WorkProjectSeriesSchemaEditor } from '@/app/work-project-series-schemas/_components/WorkProjectSeriesSchemaEditor';

import { sumAllSchemas } from '@/app/work-project-series-schemas/_functions/sumDeliveryAllocations';
import {
  useGlobalController,
  useGlobalListener,
  useGlobalListenerGroup
} from 'selective-context';
import { DtoUiListAll } from 'dto-stores';
import { EmptyArray } from '@/api/literals';
import {
  CycleDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types';
import { getDomainAlias } from '@/api/getDomainAlias';
import pluralize from 'pluralize';
import { startCase } from 'lodash';

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
          className={'mb-2 grid grid-cols-4 divide-x border-b-2 text-center'}
        >
          <div>Name</div>
          <div className={'col-span-2'}>
            Lesson allocation total: {totalAllocation}
          </div>
          <div className={'grid grid-cols-3'}>
            <div>Short code</div>
            <div>{startCase(getDomainAlias('user'))} limit</div>
          </div>
        </div>
        <DtoUiListAll
          entityClass={entityType}
          renderAs={WorkProjectSeriesSchemaEditor}
        />
      </CardBody>
    </Card>
  );
}

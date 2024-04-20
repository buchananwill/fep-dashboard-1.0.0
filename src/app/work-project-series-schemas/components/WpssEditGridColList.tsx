'use client';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { ColumnMetaData } from '@/components/generic/DtoTable';
import React, { useCallback, useMemo } from 'react';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { DtoComponentArrayGenerator } from 'dto-stores';
import { LessonDeliveryModel } from '@/app/work-project-series-schemas/components/LessonDeliveryModel';

const entityType = EntityNamesMap.workProjectSeriesSchema;
export interface WpssProps {
  data: WorkProjectSeriesSchemaDto[];
  deliveryAllocationSizes: number[];
}

export default function WpssEditGridColList({
  data,
  deliveryAllocationSizes
}: WpssProps) {
  const columns: ColumnMetaData[] = useMemo(() => {
    return [
      { uid: 'name', name: 'name' },
      ...deliveryAllocationSizes.map((size) => ({
        uid: `size:${size}`,
        name: `${size}`
      })),
      { uid: 'workProjectBandwidth', name: 'Bandwidth' },
      { uid: 'userToProviderRatio', name: 'UserToProviderRatio' },
      { uid: 'shortCode', name: 'Short Code' }
    ];
  }, [deliveryAllocationSizes]);
  const renderCell = useCallback(
    (dto: WorkProjectSeriesSchemaDto, columnKey: React.Key) => {
      try {
        const devAlSize = parseInt(`${columnKey}`.substring(5));
        const found = dto.deliveryAllocations.find(
          (devAl) => devAl.deliveryAllocationSize === devAlSize
        );
        if (found !== undefined) return found.count;
      } catch (e) {}

      switch (columnKey) {
        case 'name':
          return (
            <DtoStoreStringValueEdit
              entity={dto}
              entityType={entityType}
              valueAccessor={(dto) => dto.name}
              producer={(value, dto) => ({ ...dto, name: value })}
              listenerKey={`${dto.id}:name`}
            />
          );
        case 'shortCode':
          return (
            <DtoStoreStringValueEdit
              entity={dto}
              entityType={entityType}
              valueAccessor={(dto) => dto.shortCode || ''}
              producer={(value, entity) => ({ ...entity, shortCode: value })}
              listenerKey={`${dto.id}:shortCode`}
            />
          );
        case 'workProjectBandwidth':
          return dto.workProjectBandwidth;
        case 'userToProviderRatio':
          return dto.userToProviderRatio;

        default: {
          return '';
        }
      }
    },
    []
  );

  return (
    <Card>
      <CardHeader>Lesson Delivery Models</CardHeader>
      <CardBody>
        <DtoComponentArrayGenerator
          entityName={entityType}
          eachAs={LessonDeliveryModel}
        />{' '}
      </CardBody>
    </Card>
  );
}

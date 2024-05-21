'use client';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { ArrayPlaceholder, ObjectPlaceholder } from 'selective-context';

import React, { useEffect, useState } from 'react';

import {
  ComponentUndefined,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  NodeModalContentProps,
  undefinedEditNodeData,
  useGraphDispatchAndListener,
  useGraphListener
} from 'react-d3-force-graph';
import { FocusToEdit } from '@/react-flow/components/generic/FocusToEdit';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import {
  DtoComponentWrapper,
  DtoControllerArray,
  useDtoStoreDispatch
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDtoListByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/sum-delivery-allocations';
import { WorkSeriesBundleAssignmentDto } from '@/api/dtos/WorkSeriesBundleAssignmentDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { LessonDeliveryModel } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/components/LessonDeliveryModel';

const listenerKey = 'details-content';

export default function OrganizationDetailsContent({
  onClose
}: NodeModalContentProps) {
  const [schemaList, setSchemaList] = useState(
    [] as WorkProjectSeriesSchemaDto[]
  );

  const {
    currentState: { memoizedFunction: commitEdit }
  } = useGraphListener<MemoizedFunction<OrganizationDto, void>>(
    GraphSelectiveContextKeys.editNodeData,
    listenerKey,
    undefinedEditNodeData
  );
  const { dispatchWithoutControl, currentState } =
    useGraphDispatchAndListener<OrganizationDto>(
      GraphSelectiveContextKeys.nodeInModal,
      listenerKey,
      ObjectPlaceholder as OrganizationDto
    );

  const {
    currentState: bundleAssignment,
    dispatchWithoutControl: bundleAssignmentDispatch
  } = useDtoStoreDispatch<WorkSeriesBundleAssignmentDto>(
    currentState?.workSeriesBundleAssignmentId,
    EntityClassMap.workSeriesBundleAssignment,
    listenerKey
  );

  const seriesSchemaIds =
    bundleAssignment?.workSeriesSchemaBundle?.workProjectSeriesSchemaIds ??
    ArrayPlaceholder;

  useEffect(() => {
    const setLocalSchemas = async () => {
      let sum = 0;
      await getDtoListByBodyList(seriesSchemaIds).then((r) => {
        setSchemaList(r);
      });
    };
    setLocalSchemas();
  }, [seriesSchemaIds, setSchemaList]);

  if (currentState === undefined)
    return <ComponentUndefined onClose={onClose} />;

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <FocusToEdit
          value={currentState.name}
          onValueChange={(value) =>
            dispatchWithoutControl((data) => ({ ...data, name: value }))
          }
        >
          {currentState.name}
        </FocusToEdit>
      </ModalHeader>
      <ModalBody>
        <DtoControllerArray
          dtoList={schemaList}
          entityName={EntityClassMap.workProjectSeriesSchema}
        />
        {schemaList.map((schema) => (
          <DtoComponentWrapper
            key={schema.id}
            entityClass={EntityClassMap.workProjectSeriesSchema}
            id={schema.id}
            uiComponent={LessonDeliveryModel}
          />
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button
          color="primary"
          onPress={() => {
            commitEdit(currentState);
            onClose();
          }}
        >
          Confirm Changes
        </Button>
      </ModalFooter>
    </>
  );
}

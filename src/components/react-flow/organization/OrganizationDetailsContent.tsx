'use client';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import {
  ArrayPlaceholder,
  ObjectPlaceholder,
  useGlobalListenerGroup
} from 'selective-context';

import React, { useMemo, useState } from 'react';

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
import { DtoComponentWrapper, useDtoStoreDispatch } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSeriesBundleAssignmentDto } from '@/api/dtos/WorkSeriesBundleAssignmentDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { LessonDeliveryModel } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/components/LessonDeliveryModel';

const listenerKey = 'details-content';

export const initialMap = new Map<string, WorkProjectSeriesSchemaDto>();

export default function OrganizationDetailsContent({
  onClose
}: NodeModalContentProps) {
  // const [schemaList, setSchemaList] = useState(
  //   [] as WorkProjectSeriesSchemaDto[]
  // );

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

  const seriesSchemaContextKeys = useMemo(() => {
    return (
      bundleAssignment?.workSeriesSchemaBundle?.workProjectSeriesSchemaIds.map(
        (id) => `${EntityClassMap.workProjectSeriesSchema}:${id}`
      ) ?? ArrayPlaceholder
    );
  }, [bundleAssignment]);

  const { currentState: schemaMap } = useGlobalListenerGroup({
    contextKeys: seriesSchemaContextKeys,
    listenerKey,
    initialValue: initialMap
  });
  // useEffect(() => {
  //   const setLocalSchemas = async () => {
  //     let sum = 0;
  //     await getDtoListByBodyList(seriesSchemaContextKeys).then((r) => {
  //       setSchemaList(r);
  //     });
  //   };
  //   setLocalSchemas();
  // }, [seriesSchemaContextKeys, setSchemaList]);

  const schemaComponents = useMemo(() => {
    return [...schemaMap.values()].map((schema) => (
      <DtoComponentWrapper
        key={schema.id}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        id={schema.id}
        uiComponent={LessonDeliveryModel}
      />
    ));
  }, [schemaMap]);

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
      <ModalBody>{...schemaComponents}</ModalBody>
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

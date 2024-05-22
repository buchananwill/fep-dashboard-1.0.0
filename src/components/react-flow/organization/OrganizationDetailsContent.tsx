'use client';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { ObjectPlaceholder } from 'selective-context';

import React, { useMemo } from 'react';

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
import { ReferencedEntityUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSeriesBundleAssignmentDto } from '@/api/dtos/WorkSeriesBundleAssignmentDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { LessonDeliveryModel } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/components/LessonDeliveryModel';
import { useReferencedEntity } from 'dto-stores/dist/hooks/useReferencedEntity';

const listenerKey = 'details-content';

export const initialMap = new Map<string, unknown>();

const whileLoading = () => null;
export default function OrganizationDetailsContent({
  onClose
}: NodeModalContentProps) {
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

  const { currentState: bundleAssignment } =
    useReferencedEntity<WorkSeriesBundleAssignmentDto>(
      currentState?.workSeriesBundleAssignmentId,
      EntityClassMap.workSeriesBundleAssignment,
      listenerKey
    );

  const schemaComponents = useMemo(() => {
    return bundleAssignment?.workSeriesSchemaBundle?.workProjectSeriesSchemaIds?.map(
      (id) => (
        <ReferencedEntityUiWrapper<WorkProjectSeriesSchemaDto>
          key={id}
          entityClass={EntityClassMap.workProjectSeriesSchema}
          id={id}
          renderAs={LessonDeliveryModel}
          whileLoading={whileLoading}
        />
      )
    );
  }, [bundleAssignment]);

  if (currentState === undefined)
    return <ComponentUndefined onClose={onClose} />;

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <FocusToEdit
          value={currentState.name}
          label={'Class name'}
          size={'sm'}
          onValueChange={(value) =>
            dispatchWithoutControl((data) => ({ ...data, name: value }))
          }
        >
          {currentState.name}
        </FocusToEdit>
      </ModalHeader>
      <ModalBody>{schemaComponents && schemaComponents}</ModalBody>
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

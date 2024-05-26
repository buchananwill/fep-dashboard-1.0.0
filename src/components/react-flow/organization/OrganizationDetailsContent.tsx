'use client';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { ArrayPlaceholder, ObjectPlaceholder } from 'selective-context';

import React, { ChangeEvent, useMemo } from 'react';

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
  DtoUiComponentProps,
  LazyDtoComponentWrapper,
  NamespacedHooks
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSeriesBundleAssignmentDto } from '@/api/dtos/WorkSeriesBundleAssignmentDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { LessonDeliveryModel } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/components/LessonDeliveryModel';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { Select } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { d } from '@nextui-org/slider/dist/use-slider-64459b54';

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

  const { currentState: bundleList } = NamespacedHooks.useListen<
    WorkSeriesSchemaBundleDto[]
  >(
    EntityClassMap.workSeriesSchemaBundle,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    ArrayPlaceholder
  );

  if (currentState === undefined)
    return <ComponentUndefined onClose={onClose} />;

  const { workSeriesBundleAssignment } = currentState;

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
      <ModalBody>
        {workSeriesBundleAssignment && (
          <>
            <Select
              items={bundleList}
              label={'Bundle'}
              placeholder={'Assign a bundle'}
              selectedKeys={[
                workSeriesBundleAssignment.workSeriesSchemaBundleId
              ]}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                dispatchWithoutControl((data) => ({
                  ...data,
                  workSeriesBundleAssignment: {
                    ...data.workSeriesBundleAssignment,
                    workSeriesSchemaBundleId: e.target.value
                  }
                }));
              }}
            >
              {(schemaBundle) => (
                <SelectItem key={schemaBundle.id} value={schemaBundle.id}>
                  {schemaBundle.name}
                </SelectItem>
              )}
            </Select>
            <BundleAssignment
              entity={workSeriesBundleAssignment}
              entityClass={EntityClassMap.workSeriesBundleAssignment}
              deleted={false}
            />
          </>
        )}
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

function BundleAssignment({
  entity: bundleAssignment
}: DtoUiComponentProps<WorkSeriesBundleAssignmentDto>) {
  const { workSeriesSchemaBundleId } = bundleAssignment;

  return (
    <LazyDtoComponentWrapper
      renderAs={BundleDetails}
      id={workSeriesSchemaBundleId}
      entityClass={EntityClassMap.workSeriesSchemaBundle}
      whileLoading={() => null}
    />
  );
}

function BundleDetails({
  entity
}: DtoUiComponentProps<WorkSeriesSchemaBundleDto>) {
  return useMemo(() => {
    return entity.workProjectSeriesSchemaIds?.map((id) => (
      <LazyDtoComponentWrapper<WorkProjectSeriesSchemaDto>
        key={id}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        id={id}
        renderAs={LessonDeliveryModel}
        whileLoading={whileLoading}
      />
    ));
  }, [entity]);
}

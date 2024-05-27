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
  BaseDtoUiProps,
  BaseLazyDtoUiProps,
  DtoUiProps,
  LazyDtoUiProps,
  LazyDtoUiWrapper,
  NamespacedHooks
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSeriesBundleAssignmentDto } from '@/api/dtos/WorkSeriesBundleAssignmentDtoSchema';
import { LessonDeliveryModel } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/components/LessonDeliveryModel';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { Select } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { produce } from 'immer';

const listenerKey = 'details-content';

export const initialMap = new Map<string, unknown>();

const whileLoading = () => null;
export default function OrganizationDetailsContent({
  onClose
}: Partial<NodeModalContentProps>) {
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

  const onCloseDefined = onClose ? onClose : () => {};

  if (currentState === undefined)
    return <ComponentUndefined onClose={onCloseDefined} />;

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
                dispatchWithoutControl((data) =>
                  produce(data, (draft) => {
                    draft.workSeriesBundleAssignment.workSeriesSchemaBundleId =
                      e.target.value;
                    return draft;
                  })
                );
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
            onCloseDefined();
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
}: BaseDtoUiProps<WorkSeriesBundleAssignmentDto>) {
  const { workSeriesSchemaBundleId } = bundleAssignment;

  return (
    <LazyDtoUiWrapper
      renderAs={BundleDetails}
      entityId={workSeriesSchemaBundleId}
      entityClass={EntityClassMap.workSeriesSchemaBundle}
      whileLoading={() => null}
    />
  );
}

function BundleDetails({
  entity
}: BaseLazyDtoUiProps<WorkSeriesSchemaBundleDto>) {
  return useMemo(() => {
    return entity.workProjectSeriesSchemaIds?.map((id) => (
      <LazyDtoUiWrapper
        key={id}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        entityId={id}
        renderAs={LessonDeliveryModel}
        whileLoading={whileLoading}
      />
    ));
  }, [entity]);
}

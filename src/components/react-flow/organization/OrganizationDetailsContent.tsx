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
} from 'react-d3-force-wrapper';
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
import { LessonDeliveryModel } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_components/LessonDeliveryModel';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { Select } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { produce } from 'immer';
import { z } from 'zod';

const listenerKey = 'details-content';

export const initialMap = new Map<unknown, unknown>();

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

  const { workSeriesBundleAssignment } = currentState;
  const workSeriesSchemaBundleId =
    workSeriesBundleAssignment?.workSeriesSchemaBundleId;

  const selectedKeys = useMemo(() => {
    return workSeriesSchemaBundleId ? [workSeriesSchemaBundleId] : [];
  }, [workSeriesSchemaBundleId]);
  if (currentState === undefined)
    return <ComponentUndefined onClose={onCloseDefined} />;

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
              selectedKeys={selectedKeys}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const newId = e.target.value;
                dispatchWithoutControl((data) =>
                  produce(data, (draft) => {
                    if (draft.workSeriesBundleAssignment) {
                      let isId = false;
                      try {
                        isId = !!z.string().uuid().parse(newId);
                      } catch (e) {}
                      if (isId)
                        draft.workSeriesBundleAssignment.workSeriesSchemaBundleId =
                          e.target.value;
                      else
                        delete draft.workSeriesBundleAssignment
                          .workSeriesSchemaBundleId;
                    }
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
      entityId={workSeriesSchemaBundleId ?? ''}
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

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
  LazyDtoUiWrapper,
  NamespacedHooks
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaEditor } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_components/WorkProjectSeriesSchemaEditor';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { Select } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { produce } from 'immer';
import { z } from 'zod';
import { WorkSchemaNodeAssignmentDto } from '@/api/dtos/WorkSchemaNodeAssignmentDtoSchema';
import { listenerKeyDetailsContent } from '@/app/_literals';

const whileLoading = () => null;
export default function OrganizationDetailsContent({
  onClose
}: Partial<NodeModalContentProps>) {
  const {
    currentState: { memoizedFunction: commitEdit }
  } = useGraphListener<MemoizedFunction<OrganizationDto, void>>(
    GraphSelectiveContextKeys.editNodeData,
    listenerKeyDetailsContent,
    undefinedEditNodeData
  );
  const { dispatchWithoutControl, currentState } =
    useGraphDispatchAndListener<OrganizationDto>(
      GraphSelectiveContextKeys.nodeInModal,
      listenerKeyDetailsContent,
      ObjectPlaceholder as OrganizationDto
    );

  const { currentState: rootNodeList } = NamespacedHooks.useListen<
    WorkSeriesSchemaBundleDto[]
  >(
    EntityClassMap.workSchemaNode,
    KEY_TYPES.MASTER_LIST,
    listenerKeyDetailsContent,
    ArrayPlaceholder
  );

  const onCloseDefined = onClose ? onClose : () => {};

  const { workSeriesBundleAssignment } = currentState;
  const workSeriesSchemaBundleId = workSeriesBundleAssignment?.workSchemaNodeId;

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
              items={rootNodeList}
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
                        isId = !!z.number().parse(newId);
                      } catch (e) {}
                      if (isId)
                        draft.workSeriesBundleAssignment.workSchemaNodeId =
                          parseInt(e.target.value, 10);
                      else
                        delete draft.workSeriesBundleAssignment
                          .workSchemaNodeId;
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
              entityClass={EntityClassMap.workSchemaNodeAssignment}
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
  entity: rootNodeAssignment
}: BaseDtoUiProps<WorkSchemaNodeAssignmentDto>) {
  const { workSchemaNodeId } = rootNodeAssignment;

  return (
    <LazyDtoUiWrapper
      renderAs={BundleDetails}
      entityId={workSchemaNodeId ?? 0}
      entityClass={EntityClassMap.workSchemaNode}
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
        renderAs={WorkProjectSeriesSchemaEditor}
        whileLoading={whileLoading}
      />
    ));
  }, [entity]);
}

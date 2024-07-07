'use client';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import {
  ArrayPlaceholder,
  ObjectPlaceholder,
  useGlobalListener
} from 'selective-context';

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
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';

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
    WorkSchemaNodeDto[]
  >(
    EntityClassMap.workSchemaNode,
    KEY_TYPES.MASTER_LIST,
    listenerKeyDetailsContent,
    ArrayPlaceholder
  );

  const onCloseDefined = onClose ? onClose : () => {};

  const { workSeriesBundleAssignment } = currentState;
  const workSchemaNodeId = workSeriesBundleAssignment?.workSchemaNodeId;

  const selectedKeys = useMemo(() => {
    return workSchemaNodeId ? [`${workSchemaNodeId}`] : [];
  }, [workSchemaNodeId]);
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
              label={'WorkSchemaNode'}
              placeholder={'Assign a WorkSchemaNode'}
              selectedKeys={selectedKeys}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const newId = e.target.value;
                console.log(newId, typeof newId);
                dispatchWithoutControl((data) =>
                  produce(data, (draft) => {
                    if (draft.workSeriesBundleAssignment) {
                      let isId = false;
                      try {
                        const intValue = parseInt(newId);
                        isId = !isNaN(intValue);
                      } catch (e) {
                        console.warn('Failed to parse id to number:', newId);
                      }
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
              {(schemaNode) => (
                <SelectItem key={schemaNode.id} value={schemaNode.id}>
                  {schemaNode.name}
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

  return workSchemaNodeId ? (
    <LazyDtoUiWrapper
      renderAs={BundleDetails}
      entityId={workSchemaNodeId}
      entityClass={EntityClassMap.workSchemaNode}
      whileLoading={() => null}
    />
  ) : null;
}

function BundleDetails({ entity }: BaseLazyDtoUiProps<WorkSchemaNodeDto>) {
  const listenerKey = useUuidListenerKey();
  const { currentState } = useGlobalListener({
    contextKey: `rollupTotal:${entity.id}`,
    initialValue: 0,
    listenerKey
  });
  return currentState;
}

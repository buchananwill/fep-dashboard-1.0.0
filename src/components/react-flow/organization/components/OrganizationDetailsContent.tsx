'use client';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { ArrayPlaceholder, ObjectPlaceholder } from 'selective-context';

import React, { ChangeEvent, useEffect, useMemo } from 'react';

import {
  ComponentUndefined,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  NodeModalContentProps,
  undefinedEditNodeData,
  useGraphDispatchAndListener,
  useGraphListener
} from 'react-d3-force-wrapper';
import { FocusToEdit } from '@/components/generic/FocusToEdit';
import {
  OrganizationDto,
  OrganizationTypeDto,
  WorkSchemaNodeAssignmentDto,
  WorkSchemaNodeRootTotalDeliveryAllocationRollupDto
} from '@/api/generated-types/generated-types';
import {
  BaseDtoUiProps,
  BaseLazyDtoUiProps,
  EditAddDeleteDtoControllerArray,
  LazyDtoUiWrapper,
  NamespacedHooks
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { Select } from '@nextui-org/react';
import { SelectItem } from '@nextui-org/select';
import { produce } from 'immer';
import { listenerKeyDetailsContent } from '@/app/_literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useCreateTypeProps } from '@/components/user-role/create-user-role/UseCreateTypeProps';
import { Api } from '@/api/clientApi';
import CreateNewTypeModal from '@/components/entities-with-type/CreateNewRoleTypeModal';
import { useSimpleApiFetcher } from '@/components/work-task-types/useSimpleApiFetcher';
import { workSchemaNodeRollUp } from '@/components/work-schema-node-assignments/WorkSchemaNodeAssignmentsPage';

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
    WorkSchemaNodeRootTotalDeliveryAllocationRollupDto[]
  >(
    workSchemaNodeRollUp,
    KEY_TYPES.MASTER_LIST,
    listenerKeyDetailsContent,
    ArrayPlaceholder
  );

  const onCloseDefined = onClose ? onClose : () => {};

  const { workSchemaNodeAssignment } = currentState;
  const workSchemaNodeId = workSchemaNodeAssignment?.workSchemaNodeId;

  const organizationTypeDtos = useSimpleApiFetcher(Api.OrganizationType.getAll);

  console.log(organizationTypeDtos);

  const createTypeProps = useCreateTypeProps(
    Api.OrganizationType.postOne,
    EntityClassMap.organizationType
  );

  const dispatchOrgTypes = NamespacedHooks.useDispatch<OrganizationTypeDto[]>(
    EntityClassMap.organizationType,
    KEY_TYPES.MASTER_LIST
  );
  useEffect(() => {
    dispatchOrgTypes((prev) => {
      const idSet = new Set(prev.map((orgType) => orgType.id));
      return [
        ...prev,
        ...organizationTypeDtos.filter((orgType) => !idSet.has(orgType.id))
      ];
    });
  }, [organizationTypeDtos, dispatchOrgTypes]);

  const { isOpen } = createTypeProps;

  const selectedKeys = useMemo(() => {
    return workSchemaNodeId ? [`${workSchemaNodeId}`] : [];
  }, [workSchemaNodeId]);
  if (currentState === undefined)
    return <ComponentUndefined onClose={onCloseDefined} />;

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.organizationType}
        dtoList={organizationTypeDtos}
      />
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
        {workSchemaNodeAssignment && (
          <>
            <Select
              items={rootNodeList}
              label={'WorkSchemaNode'}
              placeholder={'Assign a WorkSchemaNode'}
              selectedKeys={selectedKeys}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const newId = e.target.value;
                dispatchWithoutControl((data) =>
                  produce(data, (draft) => {
                    if (draft.workSchemaNodeAssignment) {
                      let isId = false;
                      try {
                        const intValue = parseInt(newId);
                        isId = !isNaN(intValue);
                      } catch (e) {
                        console.warn('Failed to parse id to number:', newId);
                      }
                      if (isId)
                        draft.workSchemaNodeAssignment.workSchemaNodeId =
                          parseInt(e.target.value, 10);
                      else
                        delete draft.workSchemaNodeAssignment.workSchemaNodeId;
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
              entity={workSchemaNodeAssignment}
              entityClass={EntityClassMap.workSchemaNodeAssignment}
              deleted={false}
            />
          </>
        )}
        <Button onPress={() => createTypeProps.onOpenChange(true)}>
          Create New Type
        </Button>
        <CreateNewTypeModal {...createTypeProps} />
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
      entityClass={workSchemaNodeRollUp}
      whileLoading={() => null}
    />
  ) : null;
}

function BundleDetails({
  entity
}: BaseLazyDtoUiProps<WorkSchemaNodeRootTotalDeliveryAllocationRollupDto>) {
  const listenerKey = useUuidListenerKey();
  // const { currentState } = useGlobalListener({
  //   contextKey: `${workSchemaNodeRollUp}:${entity.id}`,
  //   initialValue:
  //     ObjectPlaceholder as WorkSchemaNodeRootTotalDeliveryAllocationRollupDto,
  //   listenerKey
  // });
  return entity.deliveryAllocationSum ?? 0;
}

'use client';
import { Badge, Button, Select } from '@mantine/core';
import { ArrayPlaceholder, ObjectPlaceholder } from 'selective-context';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';

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
} from '@/api/generated-types/generated-types_';
import {
  BaseDtoUiProps,
  BaseLazyDtoUiProps,
  EditAddDeleteDtoControllerArray,
  LazyDtoUiWrapper,
  NamespacedHooks
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { listenerKeyDetailsContent } from '@/app/_literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useCreateTypeProps } from '@/components/user-role/create-user-role/UseCreateTypeProps';
import { Api } from '@/api/clientApi';
import CreateNewTypeModal from '@/components/entities-with-type/CreateNewRoleTypeModal';
import { useSimpleApiFetcher } from '@/components/work-types/useSimpleApiFetcher';
import { workSchemaNodeRollUp } from '@/components/work-schema-node-assignments/WorkSchemaNodeAssignmentsPage';
import { useEntitySelectionWithSimpleSelectables } from '@/hooks/useEntitySelectionWithSimpleSelectables';
import { useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders } from '@/components/work-schema/_components/useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders';
import { isEqual } from 'lodash';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';

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
  const { workSchemaNodeAssignment } = currentState;
  const workSchemaNodeId = workSchemaNodeAssignment?.workSchemaNodeId;
  const nodeIdListRef = useRef([] as number[]);

  const nodeIdList = useMemo(() => {
    const list = workSchemaNodeId ? [workSchemaNodeId] : [];
    if (isEqual(nodeIdListRef.current, list)) {
      return nodeIdListRef.current;
    } else {
      nodeIdListRef.current = list;
      return list;
    }
  }, [workSchemaNodeId]);

  const updateSingleListItem = useCallback(
    (list: number[]) => {
      if (list.length === 0) {
        dispatchWithoutControl((prev) => ({
          ...prev,
          workSchemaNodeAssignment: undefined
        }));
      } else {
        dispatchWithoutControl((prev) => ({
          ...prev,
          workSchemaNodeAssignment: {
            organizationId: prev.id,
            workSchemaNodeId: list[0],
            id: prev.id
          }
        }));
      }
    },
    [dispatchWithoutControl]
  );

  useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders(
    nodeIdList,
    updateSingleListItem,
    workSchemaNodeRollUp
  );

  const { selectableList, selectionList, onChange } =
    useEntitySelectionWithSimpleSelectables<WorkSchemaNodeRootTotalDeliveryAllocationRollupDto>(
      workSchemaNodeRollUp,
      (item) => item.name ?? String(item.id)
    );

  const onCloseDefined = onClose ? onClose : () => {};

  const organizationTypeDtos = useSimpleApiFetcher(Api.OrganizationType.getAll);

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

  const { opened } = createTypeProps;

  if (currentState === undefined)
    return <ComponentUndefined onClose={onCloseDefined} />;

  return (
    <div className={'flex flex-col gap-2'}>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.organizationType}
        dtoList={organizationTypeDtos}
      />
      <h1 className="flex flex-col gap-1">
        <FocusToEdit
          value={currentState.name}
          placeholder={'Class name'}
          size={'sm'}
          onChange={(e) =>
            dispatchWithoutControl((data) => ({
              ...data,
              name: e.target.value
            }))
          }
        >
          {currentState.name}
        </FocusToEdit>
      </h1>

      <Select
        data={selectableList}
        value={workSchemaNodeId ? String(workSchemaNodeId) : undefined}
        onChange={onChange}
      />
      {workSchemaNodeAssignment && (
        <>
          <BundleAssignment
            entity={workSchemaNodeAssignment}
            entityClass={EntityClassMap.workSchemaNodeAssignment}
            deleted={false}
          />
        </>
      )}
      {/*<Button onClick={createTypeProps.onOpen}>Create New Type</Button>*/}
      {/*<CreateNewTypeModal {...createTypeProps} />*/}

      <div className={'flex justify-center gap-2'}>
        <Button color="danger" variant="light" onClick={onClose}>
          Close
        </Button>
        <Button
          color="primary"
          onClick={() => {
            commitEdit(currentState);
            onCloseDefined();
          }}
        >
          Update Graph
        </Button>
      </div>
    </div>
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
  return (
    <div className={'flex items-center justify-between gap-2'}>
      {getStartCaseDomainAlias('cycleSubspans')} in this bundle:
      <Badge
        size={'lg'}
        styles={{
          root: { fontFamily: 'inherit' },
          label: { fontFamily: 'inherit' }
        }}
      >
        {entity.deliveryAllocationSum ?? 0}
      </Badge>
    </div>
  );
}

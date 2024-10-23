'use client';

import { Api } from '@/api/clientApi';
import {
  ChangesCallbackMap,
  EditAddDeleteDtoControllerArray,
  InitialMap
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import ResourceRequirementItemEditTable from '@/components/tables/edit-tables/ResourceRequirementItemEditTable';
import { useCallback, useTransition } from 'react';
import { Loading } from '@/components/feasibility-report/Loading';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import { workTaskTypeIdInModal } from '@/components/tables/edit-v2/WorkTaskTypeEditTable';
import { Button, Modal, ModalProps } from '@mantine/core';
import { SetOptional } from 'type-fest';
import { useQuery } from '@tanstack/react-query';

export default function ResourceRequirementItemModal({
  onClose,
  opened,
  workTaskTypeId
}: SetOptional<Pick<ModalProps, 'opened' | 'onClose'>, 'onClose'> & {
  workTaskTypeId?: number;
}) {
  const [isPending, startTransition] = useTransition();
  const { data: assetRoleTypeDtos, isPending: assetsPending } = useQuery({
    queryKey: [EntityClassMap.assetRoleType, 'all'],
    queryFn: () => Api.AssetRoleType.getAll()
  });
  const { data: providerRoleTypeDtos, isPending: providersPending } = useQuery({
    queryKey: [EntityClassMap.providerRoleType, 'all'],
    queryFn: () => Api.ProviderRoleType.getAll()
  });
  const { data: resourceRequirementsFromServer, isPending: rriPending } =
    useQuery({
      queryKey: [EntityClassMap.resourceRequirementItem, { workTaskTypeId }],
      queryFn: () =>
        Api.ResourceRequirementItem.getDtoListByExampleList([
          { workTaskTypeId }
        ])
    });

  const anyDataPending = assetsPending || providersPending || rriPending;
  const anyDataMissing =
    !resourceRequirementsFromServer ||
    !providerRoleTypeDtos ||
    !assetRoleTypeDtos;

  const { dispatchWithoutListen } = useGlobalDispatch<number | 'closed'>(
    workTaskTypeIdInModal
  );

  const { currentState } = useGlobalListener({
    contextKey: 'unsavedChanges',
    initialValue: InitialMap as ChangesCallbackMap,
    listenerKey: 'resourceRequirementModal'
  });

  const changes = currentState.has(EntityClassMap.resourceRequirementItem);

  const closeModal = useCallback(() => {
    dispatchWithoutListen('closed');
  }, [dispatchWithoutListen]);

  const onConfirm = useCallback(async () => {
    startTransition(async () => {
      const changesCallback = currentState.get(
        EntityClassMap.resourceRequirementItem
      );
      if (changesCallback) {
        await changesCallback.current();
        closeModal();
      }
    });
  }, [currentState, closeModal]);

  console.log({
    providerRoleTypeDtos,
    assetRoleTypeDtos,
    resourceRequirementsFromServer
  });

  if (workTaskTypeId === undefined) return null;

  return (
    <>
      {!anyDataMissing && (
        <>
          <EditAddDeleteDtoControllerArray
            entityClass={EntityClassMap.resourceRequirementItem}
            dtoList={resourceRequirementsFromServer}
            postServerAction={Api.ResourceRequirementItem.postList}
            updateServerAction={Api.ResourceRequirementItem.putList}
            deleteServerAction={Api.ResourceRequirementItem.deleteIdList}
          />
          <EditAddDeleteDtoControllerArray
            entityClass={EntityClassMap.assetRoleType}
            dtoList={assetRoleTypeDtos}
          />
          <EditAddDeleteDtoControllerArray
            entityClass={EntityClassMap.providerRoleType}
            dtoList={providerRoleTypeDtos}
          />
        </>
      )}
      <Modal opened={opened} size={'5xl'} onClose={onClose ?? (() => {})}>
        <div>
          <h1 className="flex flex-col gap-1">
            Edit Task Resource Requirements
          </h1>
          {!anyDataPending ? (
            <div>
              <ResourceRequirementItemEditTable
                workTaskTypeId={workTaskTypeId}
              />
            </div>
          ) : (
            <div>
              <Loading />
            </div>
          )}
          <div>
            <Button color="red" variant="light" onClick={closeModal}>
              Cancel
            </Button>
            <Button color="primary" onClick={onConfirm} disabled={!changes}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

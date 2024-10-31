'use client';

import { Api } from '@/api/clientApi';
import {
  ChangesCallbackMap,
  EditAddDeleteDtoControllerArray,
  InitialMap
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import ResourceRequirementItemEditTable from '@/components/tables/edit-tables/ResourceRequirementItemEditTable';
import { useCallback, useMemo, useTransition } from 'react';
import { Loading } from '@/components/feasibility-report/Loading';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import { workTaskTypeIdInModal } from '@/components/tables/edit-tables/WorkTaskTypeEditTable';
import { Button, Modal, ModalProps } from '@mantine/core';
import { SetOptional } from 'type-fest';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function ResourceRequirementItemModal({
  onClose,
  opened,
  workTaskTypeId
}: SetOptional<Pick<ModalProps, 'opened' | 'onClose'>, 'onClose'> & {
  workTaskTypeId?: number;
}) {
  const [isPending, startTransition] = useTransition();
  const rriQueryKey = useMemo(() => {
    return [EntityClassMap.resourceRequirementItem, { workTaskTypeId }];
  }, [workTaskTypeId]);

  const { data: assetRoleTypeDtos, isFetching: assetsPending } = useQuery({
    queryKey: [EntityClassMap.assetRoleType, 'all'],
    queryFn: () => Api.AssetRoleType.getAll()
  });
  const { data: providerRoleTypeDtos, isFetching: providersPending } = useQuery(
    {
      queryKey: [EntityClassMap.providerRoleType, 'all'],
      queryFn: () => Api.ProviderRoleType.getAll()
    }
  );
  const { data: resourceRequirementsFromServer, isFetching: rriPending } =
    useQuery({
      queryKey: rriQueryKey,
      queryFn: () =>
        Api.ResourceRequirementItem.getDtoListByExampleList([
          { workTaskTypeId }
        ])
    });
  const queryClient = useQueryClient();

  const anyDataFetching = assetsPending || providersPending || rriPending;
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
        await queryClient.invalidateQueries({ queryKey: rriQueryKey });
        closeModal();
      }
    });
  }, [currentState, closeModal, rriQueryKey, queryClient]);

  if (workTaskTypeId === undefined) return null;

  return (
    <>
      {!anyDataFetching && !anyDataMissing && (
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
        <div className={'flex flex-col gap-2'}>
          <h1 className="flex flex-col gap-1">
            Edit Task Resource Requirements
          </h1>
          {!anyDataFetching ? (
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
          <div className={'center-horizontal-with-margin flex w-fit gap-2'}>
            <Button color="red" variant="light" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={onConfirm} disabled={!changes}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

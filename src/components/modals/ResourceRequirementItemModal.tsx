'use client';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Api } from '@/api/clientApi';
import {
  ChangesCallbackMap,
  EditAddDeleteDtoControllerArray,
  InitialMap
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import ResourceRequirementItemEditTable from '@/components/tables/edit-tables/ResourceRequirementItemEditTable';
import { useCallback, useEffect, useState } from 'react';
import { useSimpleApiFetcher } from '@/components/work-task-types/useSimpleApiFetcher';
import { EmptyArray } from '@/api/literals';
import { ResourceRequirementItemDto } from '@/api/generated-types/generated-types';
import { Loading } from '@/components/feasibility-report/Loading';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import { workTaskTypeIdInModal } from '@/components/tables/edit-tables/WorkTaskTypeEditTable';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';

export default function ResourceRequirementItemModal({
  isOpen,
  onOpenChange,
  workTaskTypeId
}: Pick<ModalProps, 'isOpen' | 'onOpenChange'> & {
  workTaskTypeId?: number;
}) {
  const assetRoleTypeDtos = useSimpleApiFetcher(Api.AssetRoleType.getAll);
  const providerRoleTypeDtos = useSimpleApiFetcher(Api.ProviderRoleType.getAll);
  const [show, setShow] = useState(false);
  const [resourceRequirementsFromServer, setResourceRequirementsFromServer] =
    useState<ResourceRequirementItemDto[]>(EmptyArray);

  const { dispatchWithoutListen } = useGlobalDispatch<number | 'closed'>(
    workTaskTypeIdInModal
  );

  const { currentState } = useGlobalListener({
    contextKey: 'unsavedChanges',
    initialValue: InitialMap as ChangesCallbackMap,
    listenerKey: 'resourceRequirementModal'
  });

  const changes = currentState.has(EntityClassMap.resourceRequirementItem);

  useEffect(() => {
    const fetch = async () => {
      if (workTaskTypeId !== undefined) {
        const resourceRequirementItemDtos =
          await Api.ResourceRequirementItem.getDtoListByExampleList([
            { workTaskTypeId }
          ]);
        setResourceRequirementsFromServer(resourceRequirementItemDtos);
        setShow(true);
      } else {
        setResourceRequirementsFromServer(EmptyArray);
        setShow(false);
      }
    };
    fetch();
  }, [workTaskTypeId]);

  const closeModal = useCallback(() => {
    dispatchWithoutListen('closed');
  }, [dispatchWithoutListen]);

  const onConfirm = useCallback(async () => {
    const changesCallback = currentState.get(
      EntityClassMap.resourceRequirementItem
    );
    if (changesCallback) {
      await changesCallback.current();
      setShow(false);
      closeModal();
    }
  }, [currentState, closeModal]);

  if (!isOpen || workTaskTypeId === undefined || !show) return null;

  return (
    <>
      {show && (
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
      <Modal isOpen={isOpen} size={'5xl'}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Task Resource Requirements
              </ModalHeader>
              {show ? (
                <ModalBody>
                  <ResourceRequirementItemEditTable
                    workTaskTypeId={workTaskTypeId}
                  />
                </ModalBody>
              ) : (
                <ModalBody>
                  <Loading />
                </ModalBody>
              )}
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closeModal}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onConfirm}
                  isDisabled={!changes}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

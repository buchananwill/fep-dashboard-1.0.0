import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import {
  KnowledgeDomainDto,
  ProviderRoleDto
} from '@/api/generated-types/generated-types';
import { EntityApiKey } from '@/api/types';
import { Button } from '@nextui-org/button';
import { get } from 'lodash';
import { useDisclosure } from '@nextui-org/use-disclosure';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal';
import { Loading } from '@/components/feasibility-report/Loading';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import {
  EditAddDeleteDtoControllerArray,
  useDtoStoreDispatch
} from 'dto-stores';
import { useCallback } from 'react';
import { ControlledSelector } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/ControlledSelector';
import { EntityClassMap } from '@/api/entity-class-map';

export function KnowledgeDomainSelectCell(
  props: NextUiCellComponentProps<ProviderRoleDto>
) {
  const useDisclosureProps = useDisclosure();

  const { path, entity } = props;

  if (path === 'type') return null;

  return (
    <>
      <Button onPress={useDisclosureProps.onOpen}>{get(entity, path)}</Button>
      {useDisclosureProps.isOpen && (
        <LocalModal {...useDisclosureProps} {...props} />
      )}
    </>
  );
}

function LocalModal({
  entityClass,
  entity,
  path,
  ...props
}: ReturnType<typeof useDisclosure> &
  NextUiCellComponentProps<ProviderRoleDto>) {
  const getAllDomains = Api.KnowledgeDomain.getAll;

  const { data, isPending } = useQuery({
    queryKey: [EntityClassMap.knowledgeDomain, 'all'],
    queryFn: () => getAllDomains()
  });

  const { dispatchWithoutListen: dispatch } =
    useDtoStoreDispatch<ProviderRoleDto>(entity.id, entityClass);

  const handleSelectionChange = useCallback(
    (selection: KnowledgeDomainDto | undefined) => {
      dispatch((prev) => ({
        ...prev,
        knowledgeDomainName: selection?.name,
        knowledgeDomainId: selection?.id
      }));
    },
    [dispatch]
  );

  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit {getStartCaseDomainAlias('providerRole')} Type
            </ModalHeader>
            {!isPending && data !== undefined ? (
              <ModalBody>
                <EditAddDeleteDtoControllerArray
                  entityClass={EntityClassMap.knowledgeDomain}
                  dtoList={data}
                />
                <ControlledSelector<number, KnowledgeDomainDto>
                  labelPath={'name'}
                  entityId={entity.knowledgeDomainId ?? null}
                  entityClass={EntityClassMap.knowledgeDomain}
                  selectionCallback={handleSelectionChange}
                />
              </ModalBody>
            ) : (
              <ModalBody>
                <Loading />
              </ModalBody>
            )}
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

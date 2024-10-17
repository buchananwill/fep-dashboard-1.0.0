import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { TypeDto } from '@/api/generated-types/generated-types';
import { EntityApiKey, HasId } from '@/api/types';
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
import { TypedPaths } from '@/api/custom-types/typePaths';

type DtoWithType<T extends TypeDto<any, any>> = {
  type: T;
} & HasId;

export function CellContent<T extends DtoWithType<any>>(
  props: NextUiCellComponentProps<T> & { typeEntity: EntityApiKey }
) {
  const useDisclosureProps = useDisclosure();

  const { path, entity } = props;

  return (
    <>
      <Button onPress={useDisclosureProps.onOpen}>{get(entity, path)}</Button>
      {useDisclosureProps.isOpen && (
        <LocalModal {...useDisclosureProps} {...props} />
      )}
    </>
  );
}

function LocalModal<
  T extends DtoWithType<TypeForT>,
  TypeForT extends TypeDto<any, any>
>({
  entityClass,
  entity,
  path,
  typeEntity,
  ...props
}: ReturnType<typeof useDisclosure> &
  NextUiCellComponentProps<T> & { typeEntity: EntityApiKey }) {
  const getAllTypes = Api[typeEntity].getAll as () => Promise<TypeForT[]>;

  const { data, isPending } = useQuery({
    queryKey: [typeEntity, 'all'],
    queryFn: () => getAllTypes()
  });

  const { dispatchWithoutListen: dispatch } = useDtoStoreDispatch<T>(
    entity.id,
    entityClass
  );

  const handleSelectionChange = useCallback(
    (selection: TypeForT | undefined) => {
      if (selection === undefined) throw Error('Undefined now allowed');
      dispatch((prev) => ({ ...prev, type: selection }));
    },
    [dispatch]
  );

  const { isOpen, onOpenChange } = props;
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Select {getStartCaseDomainAlias(typeEntity)}
            </ModalHeader>
            {!isPending && data !== undefined ? (
              <ModalBody>
                <EditAddDeleteDtoControllerArray
                  entityClass={typeEntity}
                  dtoList={data}
                />
                <ControlledSelector<number, TypeForT>
                  labelPath={'name' as TypedPaths<TypeForT, string | number>}
                  entityId={entity.type.id}
                  entityClass={typeEntity}
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

export function getTypeUpdateCell<T extends DtoWithType<any>>(
  typeEntity: EntityApiKey
) {
  return function TypeUpdateCell(props: NextUiCellComponentProps<T>) {
    return <CellContent {...props} typeEntity={typeEntity} />;
  };
}

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal';
import { Button } from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import { useUniqueStringFieldConstraint } from '@/hooks/useUniqueStringFieldConstraint';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';
import { Input } from '@nextui-org/input';
import { TypeDto } from '@/api/generated-types/generated-types';

export default function CreateNewRoleTypeModal({
  isOpen,
  onOpenChange,
  entityClass,
  onConfirm
}: {
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onConfirm?: (entity: TypeDto<any, any>) => void;
  entityClass: string;
}) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add new type
            </ModalHeader>
            <InnerContent
              onClose={onClose}
              entityClass={entityClass}
              onConfirm={onConfirm}
            />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function InnerContent({
  onClose,
  entityClass,
  onConfirm
}: {
  onClose: () => void;
  entityClass: string;
  onConfirm?: (entity: TypeDto<any, any>) => void;
}) {
  const [typeEntity, setTypeEntity] = useState({
    id: idDecrementer(),
    name: ''
  });
  const stringFieldConstraint = useUniqueStringFieldConstraint<
    TypeDto<any, any>
  >(entityClass, typeEntity.id, 'name');

  const errors = useMemo(() => {
    return stringFieldConstraint(typeEntity.name);
  }, [typeEntity, stringFieldConstraint]);

  const setName = useCallback((value: string) => {
    setTypeEntity((prev) => ({ ...prev, name: value }));
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirm) onConfirm(typeEntity);
    onClose();
  }, [onConfirm, typeEntity, onClose]);

  return (
    <>
      <ModalBody>
        <Input
          errorMessage={errors.errorMessage}
          isInvalid={errors.error}
          value={typeEntity.name}
          onValueChange={setName}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </ModalFooter>
    </>
  );
}

import { Button, Modal, TextInput } from '@mantine/core';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useUniqueStringFieldConstraint } from '@/hooks/useUniqueStringFieldConstraint';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';
import { TypeDto } from '@/api/generated-types/generated-types';

export default function CreateNewRoleTypeModal({
  opened,
  onClose,
  entityClass,
  onConfirm
}: {
  opened: boolean;
  onClose: () => void;
  onConfirm?: (entity: TypeDto<any, any>) => void;
  entityClass: string;
}) {
  if (!opened) return null;

  return (
    <Modal opened={opened} onClose={onClose}>
      <div>
        <>
          <h1 className="flex flex-col gap-1">Add new type</h1>
          <InnerContent
            onClose={onClose}
            entityClass={entityClass}
            onConfirm={onConfirm}
          />
        </>
      </div>
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

  const setName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setTypeEntity((prev) => ({ ...prev, name: e.target?.value }));
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirm) onConfirm(typeEntity);
    onClose();
  }, [onConfirm, typeEntity, onClose]);

  return (
    <>
      <div>
        <TextInput
          data-autofocus
          error={errors.errorMessage}
          value={typeEntity.name}
          onChange={setName}
        />
      </div>
      <div>
        <Button color="red" variant="subtle" onClick={onClose}>
          Cancel
        </Button>
        <Button color="blue" onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </>
  );
}

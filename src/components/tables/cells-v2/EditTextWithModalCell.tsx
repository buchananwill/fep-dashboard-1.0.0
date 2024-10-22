import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { Validator } from '@/types';
import { Button, Modal, ModalProps, TextInput } from '@mantine/core';
import { useCallback, useMemo, useRef, useState } from 'react';

export type EditTextWithModalCellProps<T extends string | undefined = string> =
  IdInnerCellProps<T> & {
    validator?: Validator<T>;
  };

export default function EditTextWithModalCell(
  props: EditTextWithModalCellProps
) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpened(true)}
        variant={'subtle'}
        fullWidth
        radius={'xs'}
        styles={{
          inner: { justifyContent: 'flex-start' }
        }}
      >
        {props.value}
      </Button>
      {opened && (
        <EditTextModal
          {...props}
          opened={opened}
          onClose={() => setOpened(false)}
        />
      )}
    </>
  );
}

function EditTextModal({
  opened,
  onClose,
  value,
  onChange,
  validator
}: EditTextWithModalCellProps & Pick<ModalProps, 'opened' | 'onClose'>) {
  const [newValue, setNewValue] = useState(value);

  const invalid = useMemo(() => {
    return validator ? validator(newValue) : undefined;
  }, [validator, newValue]);
  const valueRef = useRef(newValue);
  valueRef.current = newValue;
  const invalidRef = useRef(invalid);
  invalidRef.current = invalid;

  const onConfirm = useCallback(() => {
    if (onChange && (!invalidRef.current || !invalidRef.current.error)) {
      onChange(valueRef.current?.trim());
    }
    onClose();
  }, [onChange, onClose]);

  return (
    <Modal opened={opened} onClose={onClose}>
      <div
        className={
          'center-all-margin flex w-fit flex-col justify-items-center gap-2'
        }
      >
        <TextInput
          value={newValue}
          error={invalid?.errorMessage}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <Button onClick={onConfirm} disabled={invalid?.error}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}

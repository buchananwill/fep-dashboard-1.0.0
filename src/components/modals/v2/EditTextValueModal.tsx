import { useEffect, useRef, useState } from 'react';
import { useInputValidation } from '@/components/modals/ValidatedInput';
import { Button, Modal, ModalProps, TextInput } from '@mantine/core';
import { IdInnerCellProps } from '@/components/tables/core-table-types';

export interface Validator<T> {
  (input: T | undefined | null): { errorMessage?: string; error?: boolean };
}

export default function EditTextValueModal({
  value,
  onChange,
  opened,
  onClose,
  validateInput
}: IdInnerCellProps<string> &
  Pick<ModalProps, 'onClose' | 'opened'> & {
    validateInput?: Validator<string>;
  }) {
  const [currentValue, setCurrentValue] = useState(value);

  const textInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (opened) {
      textInput.current?.focus();
    }
  });

  const { error, errorMessage } = useInputValidation(
    validateInput,
    currentValue
  );

  return (
    <Modal opened={opened} onClose={onClose}>
      <>
        <h1>Edit: </h1>
        <div>
          <TextInput
            type={'text'}
            ref={textInput}
            value={currentValue}
            onChange={(event) => setCurrentValue(event.currentTarget.value)}
            error={errorMessage}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (onChange) onChange(currentValue);
              onClose();
            }}
            disabled={!!errorMessage}
          >
            Confirm
          </Button>
        </div>
      </>
    </Modal>
  );
}

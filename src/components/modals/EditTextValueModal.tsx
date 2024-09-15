import { useEffect, useMemo, useRef } from 'react';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps
} from '@nextui-org/modal';
import { Input, InputProps } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useGlobalDispatchAndListener } from 'selective-context';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import {
  useInputValidation,
  ValidatedInput
} from '@/components/modals/ValidatedInput';

export const ExitTextContextKey = 'edit-text-value';
export interface ConfirmActionModalProps extends Omit<ModalProps, 'children'> {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface Validator<T> {
  (input: T | undefined | null): { errorMessage?: string; error?: boolean };
}

export interface RenameModalProps extends ConfirmActionModalProps {
  contextKey: string;
  listenerKey?: string;
  validateInput?: Validator<string>;
}

function contextKeyToDisplayName(contextKey: string) {
  const strings = contextKey.split(':');
  return strings[strings.length - 1];
}

export default function EditTextValueModal({
  contextKey,
  isOpen,
  onCancel,
  onConfirm,
  validateInput,
  listenerKey: lKeyProp,
  ...props
}: RenameModalProps) {
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatchWithoutControl } =
    useGlobalDispatchAndListener<string>({
      contextKey,
      listenerKey: lKeyProp ?? listenerKey,
      initialValue: ''
    });

  const textInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      textInput.current?.focus();
    }
  });

  const { error, errorMessage } = useInputValidation(
    validateInput,
    currentState
  );

  return (
    <Modal {...props} isOpen={isOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              Edit: {contextKeyToDisplayName(contextKey)}
            </ModalHeader>
            <ModalBody>
              <Input
                type={'text'}
                ref={textInput}
                value={currentState}
                isInvalid={error}
                onValueChange={(value) => dispatchWithoutControl(value)}
                errorMessage={errorMessage}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => {
                  if (onCancel) {
                    onCancel();
                  }
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  if (onConfirm) onConfirm();
                  onClose();
                }}
                isDisabled={error}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

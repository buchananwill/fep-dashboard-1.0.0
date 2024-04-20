import { useEffect, useRef } from 'react';
import { useSelectiveContextGlobalDispatch } from 'selective-context';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps
} from '@nextui-org/modal';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

export const RenameContextKey = 'rename';
export const RenameModalWrapperListener = `${RenameContextKey}:listener`;

export interface ConfirmActionModalProps extends ModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface RenameModalProps extends ConfirmActionModalProps {
  contextKey: string;
  listenerKey: string;
  errorMessage?: string;
  error?: boolean;
}

export default function RenameModal({
  contextKey,
  listenerKey,
  children,
  error,
  isOpen,
  onCancel,
  onConfirm,
  errorMessage = 'Please choose unique, non-empty name',
  ...props
}: RenameModalProps) {
  const { currentState, dispatchWithoutControl } =
    useSelectiveContextGlobalDispatch<string>({
      contextKey,
      listenerKey,
      initialValue: ''
    });

  const textInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      textInput.current?.focus();
    }
  });

  return (
    <Modal {...props} isOpen={isOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Rename</ModalHeader>
            <ModalBody>
              <Input
                type={'text'}
                ref={textInput}
                value={currentState}
                onValueChange={(value) => dispatchWithoutControl(value)}
                // errorMessage={errorMessage}
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

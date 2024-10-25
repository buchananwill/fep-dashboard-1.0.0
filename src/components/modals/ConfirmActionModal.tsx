import { ReactNode } from 'react';
import { ConfirmActionModalProps } from '@/components/modals/confirmActionModalProps';

import { Button, Modal, ModalProps } from '@mantine/core';

export function ConfirmActionModal({
  changeDescription,
  changeDetails,
  onCancel,
  onConfirm,
  onClose,
  opened
}: {
  changeDescription: string;
  changeDetails: ReactNode;
} & ConfirmActionModalProps &
  Pick<ModalProps, 'onClose' | 'opened'>) {
  return (
    <Modal onClose={onClose} opened={opened}>
      <div>
        <h1>Confirm Change: {changeDescription}</h1>
        <div>{changeDetails}</div>
        <div>
          <Button
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}

import { ModalProps } from '@mantine/core';

export type ConfirmActionModalProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
} & Pick<ModalProps, 'opened' | 'onClose'>;

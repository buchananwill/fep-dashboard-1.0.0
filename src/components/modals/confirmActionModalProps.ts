import { ModalProps } from '@nextui-org/modal';
export type ConfirmActionModalProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
} & Pick<ModalProps, 'isOpen' | 'onClose'>;

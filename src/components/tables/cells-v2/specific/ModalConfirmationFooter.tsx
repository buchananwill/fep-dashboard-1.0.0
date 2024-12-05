import { Button } from '@mantine/core';

export function ModalConfirmationFooter({
  onCancel,
  onConfirm,
  cancelLabel,
  confirmLabel
}: {
  onCancel?: () => void;
  cancelLabel?: string;
  onConfirm?: () => void;
  confirmLabel?: string;
}) {
  return (
    <div className={'center-all-margin flex w-fit gap-4 pt-4'}>
      <Button color={'red'} variant={'subtle'} onClick={onCancel}>
        {cancelLabel ?? 'Cancel'}
      </Button>
      <Button color={'primary'} onClick={onConfirm}>
        {confirmLabel ?? 'Confirm'}
      </Button>
    </div>
  );
}

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
      <Button color={'danger'} variant={'subtle'} onClick={onCancel}>
        {cancelLabel ?? 'Cancel'}
      </Button>
      <Button color={'success'} onClick={onConfirm}>
        {confirmLabel ?? 'Confirm'}
      </Button>
    </div>
  );
}

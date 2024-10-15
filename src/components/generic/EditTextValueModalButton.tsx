import { Button, ButtonProps } from '@nextui-org/button';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import EditTextValueModal from '@/components/modals/EditTextValueModal';
import { useModalEditEntityTextAttribute } from '@/hooks/useModalEditEntityTextAttribute';
import { useCallback } from 'react';
import { BaseDtoUiProps } from 'dto-stores';
import { HasId } from '@/api/types';
import { EditTextDeletePopoverProps } from '@/components/generic/EditTextDeleteEntityPopover';
import { get } from 'lodash';

export type EditTextValueModalButtonProps<T extends HasId> =
  EditTextDeletePopoverProps<T> & Omit<BaseDtoUiProps<T>, 'deleted'>;

export function EditTextModalButton<T extends HasId>({
  entityClass,
  entity,
  dispatchWithoutControl,
  classNames,
  stringPath,
  validateInput,
  ...otherButtonProps
}: EditTextValueModalButtonProps<T>) {
  const {
    onOpen,
    dispatchTextChange,
    isOpen,
    onClose,
    onConfirm,
    ...modalProps
  } = useModalEditEntityTextAttribute(
    entityClass,
    entity,
    stringPath,
    dispatchWithoutControl
  );

  const confirmTextEdit = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  return (
    <>
      <Button
        className={classNames?.button}
        onPress={onOpen}
        {...otherButtonProps}
      >
        <span className={' ... truncate'}>{get(entity, stringPath)}</span>
        <PendingOverlay pending={isOpen} />
      </Button>
      <EditTextValueModal
        validateInput={validateInput}
        {...modalProps}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmTextEdit}
      />
    </>
  );
}

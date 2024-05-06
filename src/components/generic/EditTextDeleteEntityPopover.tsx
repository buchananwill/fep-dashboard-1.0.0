import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import RenameModal from '@/components/modals/RenameModal';
import { useEditEntityText } from '@/components/modals/useRenameEntity';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { DtoUiComponentProps } from 'dto-stores';
import { HasId, isNotUndefined } from '@/api/main';

export interface EditTextDeletePopoverProps<T extends HasId>
  extends DtoUiComponentProps<T> {
  listenerKey: string;
  textAccessor: (entity: T) => string;
  textSetter: (entity: T, value: string) => T;
  dispatchWithoutControl?: Dispatch<SetStateAction<T>>;
  classNames?: {
    button?: string;
  };
}

export function EditTextDeleteEntityPopover<T extends HasId>({
  entityClass,
  entity,
  dispatchDeletion,
  dispatchWithoutControl,
  listenerKey,
  textAccessor,
  textSetter,
  classNames
}: EditTextDeletePopoverProps<T>) {
  const {
    onOpen,
    dispatchTextChange,
    isOpen,
    onClose,
    onConfirm,
    ...modalProps
  } = useEditEntityText(
    entityClass,
    entity,
    listenerKey,
    textAccessor,
    textSetter,
    dispatchWithoutControl
  );

  const confirmTextEdit = useCallback(() => {
    onConfirm();
    onClose();
    setShowPopover(false);
  }, [onConfirm, onClose]);

  const [showPopover, setShowPopover] = useState(false);

  return (
    <>
      <Popover
        placement={'bottom'}
        showArrow
        isOpen={showPopover}
        onOpenChange={setShowPopover}
        shouldCloseOnBlur
      >
        <PopoverTrigger>
          <Button className={`${classNames?.button}`}>
            <span className={' truncate ...'}>{textAccessor(entity)}</span>
            <PendingOverlay pending={isOpen} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className={'flex gap-2'}>
            <Button
              onPress={onOpen}
              isIconOnly
              size={'sm'}
              variant={'ghost'}
              className={'w-16'}
            >
              <PencilSquareIcon className={'h-full p-0.5'} />
            </Button>
            <TwoStageClick
              isIconOnly
              className={'w-8'}
              onPress={() => {
                if (isNotUndefined(dispatchDeletion))
                  dispatchDeletion((list) => [...list, entity.id]);
              }}
            >
              <TrashIcon className={'p-1'} />
            </TwoStageClick>
          </div>
        </PopoverContent>
      </Popover>
      <RenameModal
        {...modalProps}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmTextEdit}
      />
    </>
  );
}

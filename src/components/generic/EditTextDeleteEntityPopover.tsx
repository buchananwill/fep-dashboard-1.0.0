import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import RenameModal from '@/components/modals/RenameModal';
import { useModalEditEntityTextAttribute } from '@/hooks/useModalEditEntityTextAttribute';
import { useCallback, useState } from 'react';
import { BaseDtoUiProps } from 'dto-stores';
import { isNotUndefined } from '@/api/main';
import { StringPropertyKey } from '@/types';
import { HasId } from '@/api/types';

export interface EditTextDeletePopoverProps<T extends HasId> {
  stringKey: StringPropertyKey<T>;

  classNames?: {
    button?: string;
  };
}

export function EditTextDeleteEntityPopover<T extends HasId>({
  entityClass,
  entity,
  dispatchDeletion,
  dispatchWithoutControl,

  classNames,
  stringKey
}: EditTextDeletePopoverProps<T> & BaseDtoUiProps<T>) {
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
    stringKey,
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
            <span className={' ... truncate'}>
              {entity[stringKey] as string}
            </span>
            <PendingOverlay pending={isOpen} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className={'flex gap-2'}>
            <Button
              onPress={() => {
                dispatchTextChange(entity[stringKey] as string);
                onOpen();
              }}
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

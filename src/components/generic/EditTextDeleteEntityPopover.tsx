import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import EditTextValueModal, {
  Validator
} from '@/components/modals/EditTextValueModal';
import { useModalEditEntityTextAttribute } from '@/hooks/useModalEditEntityTextAttribute';
import { useCallback, useState } from 'react';
import { BaseDtoUiProps } from 'dto-stores';
import { isNotUndefined } from '@/api/main';
import { HasId } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { get } from 'lodash';

export interface EditTextDeletePopoverProps<T extends HasId> {
  stringPath: TypedPaths<T, string>;
  classNames?: {
    button?: string;
  };
  validateInput?: Validator<string>;
}

export function EditTextDeleteEntityPopover<T extends HasId>({
  entityClass,
  entity,
  dispatchDeletion,
  dispatchWithoutControl,
  classNames,
  stringPath,
  validateInput
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
    stringPath,
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
        style={{
          zIndex: 50
        }}
        placement={'bottom'}
        showArrow
        isOpen={showPopover}
        onOpenChange={setShowPopover}
        shouldCloseOnBlur
      >
        <PopoverTrigger>
          <Button className={`${classNames?.button}`}>
            <span className={' ... truncate'}>{get(entity, stringPath)}</span>
            <PendingOverlay pending={isOpen} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className={'flex gap-2'}>
            <Button
              onPress={() => {
                dispatchTextChange(get(entity, stringPath));
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
      <EditTextValueModal
        {...modalProps}
        validateInput={validateInput}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmTextEdit}
      />
    </>
  );
}

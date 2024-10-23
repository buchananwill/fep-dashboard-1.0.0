import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import { useCallback, useState } from 'react';
import { BaseDtoUiProps } from 'dto-stores';
import { isNotUndefined } from '@/api/main';
import { HasId } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { get } from 'lodash';

import { Validator } from '@/types';
import { Button, Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import EditTextValueModal from '@/components/modals/v2/EditTextValueModal';
import { updateNestedValue } from '@/functions/updateNestedValue';

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
  const [opened, { open, close }] = useDisclosure();

  const confirmTextEdit = useCallback(
    (text: string) => {
      if (dispatchWithoutControl)
        dispatchWithoutControl((prev) =>
          updateNestedValue(prev, stringPath, text)
        );
    },
    [dispatchWithoutControl, stringPath]
  );

  const [showPopover, setShowPopover] = useState(false);

  return (
    <>
      <Popover
        zIndex={100}
        opened={showPopover}
        withArrow
        onClose={() => setShowPopover(false)}
      >
        <Popover.Target>
          <Button
            className={`${classNames?.button}`}
            onClick={() => setShowPopover((prev) => !prev)}
          >
            <span className={' ... truncate'}>{get(entity, stringPath)}</span>
            <PendingOverlay pending={opened} />
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <div className={'flex gap-2'}>
            <Button
              onClick={open}
              size={'sm'}
              variant={'ghost'}
              className={'w-16'}
            >
              <PencilSquareIcon className={'h-full p-0.5'} />
            </Button>
            <TwoStageClick
              className={'w-8'}
              onClick={() => {
                if (isNotUndefined(dispatchDeletion))
                  dispatchDeletion((list) => [...list, entity.id]);
              }}
            >
              <TrashIcon className={'h-6 w-6'} />
            </TwoStageClick>
          </div>
        </Popover.Dropdown>
      </Popover>
      <EditTextValueModal
        value={get(entity, stringPath)}
        onClose={close}
        opened={opened}
        onChange={confirmTextEdit}
        entityClass={entityClass}
        entityId={entity.id}
        validateInput={validateInput}
      />
    </>
  );
}

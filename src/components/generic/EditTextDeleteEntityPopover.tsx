import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import { useCallback, useState } from 'react';
import { BaseDtoUiProps } from 'dto-stores';
import { isNotUndefined } from '@/api/main';
import { HasId } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { get, startCase } from 'lodash';

import { Validator } from '@/types';
import { Button, ButtonProps, Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import EditTextValueModal from '@/components/modals/v2/EditTextValueModal';
import { updateNestedValue } from '@/functions/updateNestedValue';

export interface EditTextDeletePopoverProps<T extends HasId> {
  stringPath: TypedPaths<T, string>;
  validateInput?: Validator<string>;
}

export function EditTextDeleteEntityPopover<T extends HasId>({
  entityClass,
  entity,
  dispatchDeletion,
  dispatchWithoutControl,
  classNames,
  stringPath,
  validateInput,
  styles
}: EditTextDeletePopoverProps<T> &
  BaseDtoUiProps<T> &
  Pick<ButtonProps, 'styles' | 'classNames'>) {
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

  return (
    <>
      <Popover zIndex={100} withArrow trapFocus>
        <Popover.Target>
          <Button classNames={classNames} styles={styles}>
            {get(entity, stringPath)}
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
        confirmLabel={`Confirm ${startCase(stringPath)}`}
        onChange={confirmTextEdit}
        entityClass={entityClass}
        entityId={entity.id}
        validateInput={validateInput}
      />
    </>
  );
}

'use client';

import { BaseDtoUiProps, Identifier } from 'dto-stores';

import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { TimeInputCycleSubspan } from '@/app/cycles/_components/TimeInputCycleSubspan';
import { EditTextDeleteEntityPopover } from '@/components/generic/EditTextDeleteEntityPopover';
import { nameAccessor, nameSetter } from '@/components/modals/nameSetter';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import { ObjectPlaceholder, useGlobalDispatch } from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { SetStateAction, useCallback } from 'react';

export default function CycleSubspan({
  dispatchDeletion,
  ...props
}: BaseDtoUiProps<CycleSubspanDto>) {
  const { entity, dispatchWithoutControl, deleted } = props;

  const { dispatchWithoutListen } = useGlobalDispatch(
    `${EntityClassMap.cycleSubspan}:day:${entity?.zeroIndexedCycleDay ?? -1}`
  );

  const interceptDelete = useCallback(
    (action: SetStateAction<Identifier[]>) => {
      dispatchWithoutListen((list: CycleSubspanDto[]) =>
        list.filter((dto) => dto.id !== entity?.id)
      );
      if (dispatchDeletion) dispatchDeletion(action);
    },
    [dispatchDeletion, dispatchWithoutListen, entity]
  );

  if (!entity || entity === ObjectPlaceholder) {
    return null;
  }

  return (
    <div className={'relative flex w-fit items-center gap-2 rounded-lg'}>
      <DeletedOverlay
        classNames={{ overlay: 'rounded-lg' }}
        show={deleted}
        handleUnDelete={() => {
          if (interceptDelete)
            interceptDelete((list) => list.filter((id) => id !== entity.id));
        }}
      />
      <EditTextDeleteEntityPopover<CycleSubspanDto>
        classNames={{ button: 'w-24 px-2' }}
        {...props}
        dispatchDeletion={interceptDelete}
        stringKey={'name'}
      />
      <TimeInputCycleSubspan
        entity={entity}
        boundary={'Start'}
        dispatchWithoutControl={dispatchWithoutControl}
      />
      <TimeInputCycleSubspan
        entity={entity}
        boundary={'End'}
        dispatchWithoutControl={dispatchWithoutControl}
      />
    </div>
  );
}

'use client';

import { BaseDtoUiProps } from 'dto-stores';

import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { TimeInputCycleSubspan } from '@/app/cycles/_components/TimeInputCycleSubspan';
import { EditTextDeleteEntityPopover } from '@/components/generic/EditTextDeleteEntityPopover';
import { nameAccessor, nameSetter } from '@/components/modals/nameSetter';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';

export default function CycleSubspan(props: BaseDtoUiProps<CycleSubspanDto>) {
  const { entity, dispatchWithoutControl, dispatchDeletion, deleted } = props;
  return (
    <div className={'flex items-center gap-2 w-fit relative rounded-lg'}>
      <DeletedOverlay
        classNames={{ overlay: 'rounded-lg' }}
        show={deleted}
        handleUnDelete={() => {
          if (dispatchDeletion)
            dispatchDeletion((list) => list.filter((id) => id !== entity.id));
        }}
      />
      <EditTextDeleteEntityPopover<CycleSubspanDto>
        classNames={{ button: 'w-24 px-2' }}
        {...props}
        listenerKey={'popover'}
        textSetter={nameSetter}
        textAccessor={nameAccessor}
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

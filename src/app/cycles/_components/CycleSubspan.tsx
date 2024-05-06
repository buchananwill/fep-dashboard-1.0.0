'use client';

import { DtoUiComponentProps } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';

import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { TimeInputCycleSubspan } from '@/app/cycles/_components/TimeInputCycleSubspan';
import { EditTextDeleteEntityPopover } from '@/components/generic/EditTextDeleteEntityPopover';
import { nameAccessor, nameSetter } from '@/components/modals/nameSetter';
import { HasDescription } from '@/api/dtos/HasDescriptionSchema';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';

export interface CycleSubspanProps {
  id: number;
}

const entityType = EntityClassMap.cycleSubspan;

function descriptionAccessor<T extends HasDescription>(entity: T) {
  return entity.description;
}
function descriptionSetter<T extends HasDescription>(entity: T, value: string) {
  return { ...entity, description: value };
}

export default function CycleSubspan(
  props: DtoUiComponentProps<CycleSubspanDto>
) {
  const {
    entity,
    dispatchWithoutControl,
    dispatchDeletion,
    deleted,
    entityClass
  } = props;
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
      <EditTextDeleteEntityPopover
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

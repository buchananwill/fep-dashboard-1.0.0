'use client';

import { DtoUiComponentProps } from 'dto-stores';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { TimeInput } from '@nextui-org/date-input';
import { Time } from '@internationalized/date';
import { CycleSubspanDto } from '@/app/api/dtos/CycleSubspanDtoSchema';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { TimeSpanDto } from '@/app/api/dtos/TimeSpanDtoSchema';
import { TransientIdOffset } from '@/app/api/main';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';
import {
  useEditEntityText,
  useRenameEntity
} from '@/components/modals/useRenameEntity';
import { HasDescription } from '@/app/api/dtos/HasDescriptionSchema';
import { Button } from '@nextui-org/button';
import RenameModal from '@/components/modals/RenameModal';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';

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

export default function CycleSubspan({
  entity,
  dispatchWithoutControl,
  dispatchDeletion,
  deleted
}: DtoUiComponentProps<CycleSubspanDto>) {
  const {
    onOpen,
    dispatchTextChange,
    isOpen,
    onClose,
    onConfirm,
    ...modalProps
  } = useEditEntityText(
    entityType,
    entity,
    'cycleSubspanDescription',
    descriptionAccessor,
    descriptionSetter,
    dispatchWithoutControl
  );

  const confirmTextEdit = useCallback(() => {
    onConfirm();
    onClose();
    setShowPopover(false);
  }, [onConfirm, onClose]);

  const [showPopover, setShowPopover] = useState(false);

  return (
    <div className={'flex items-center gap-2 w-fit relative rounded-lg'}>
      <DeletedOverlay
        classNames={{ overlay: 'rounded-lg' }}
        show={deleted}
        handleUnDelete={() => {
          console.log(dispatchDeletion);
          if (dispatchDeletion)
            dispatchDeletion((list) => list.filter((id) => id !== entity.id));
        }}
      />
      <Popover
        placement={'bottom'}
        showArrow
        isOpen={showPopover}
        onOpenChange={(open) => setShowPopover(open)}
        shouldCloseOnBlur
      >
        <PopoverTrigger>
          <Button className={'w-24 px-2'}>
            <span className={' truncate ...'}>{entity.description}</span>
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
                if (dispatchDeletion)
                  dispatchDeletion((list) => [...list, entity.id]);
                setShowPopover(false);
              }}
            >
              <TrashIcon className={'p-1'} />
            </TwoStageClick>
          </div>
        </PopoverContent>
      </Popover>
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
      <RenameModal
        {...modalProps}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmTextEdit}
      />
    </div>
  );
}

function TimeInputCycleSubspan({
  entity,
  boundary,
  dispatchWithoutControl
}: {
  entity: CycleSubspanDto;
  boundary: 'Start' | 'End';
  dispatchWithoutControl?: Dispatch<SetStateAction<CycleSubspanDto>>;
}) {
  return (
    <TimeInput
      hourCycle={24}
      size={'sm'}
      aria-label={`${entity.description} ${boundary} time`}
      label={boundary}
      value={timeFromZTimeOnly(
        boundary === 'Start'
          ? entity.timeSpanDto.startTimeDivisionInstant
          : entity.timeSpanDto.endTimeDivisionInstant
      )}
      onChange={(value) =>
        handleTimeChange(value, boundary, dispatchWithoutControl)
      }
      classNames={{ base: 'w-fit' }}
    />
  );
}

function timeFromZTimeOnly(timeOnly: string): Time {
  const [hour, minute, second] = timeOnly
    .split(':')
    .map((part) => parseInt(part, 10));
  return new Time(hour, minute, second);
}

function handleTimeChange(
  time: Time,
  target: 'Start' | 'End',
  dispatcher?: Dispatch<SetStateAction<CycleSubspanDto>>
) {
  if (!dispatcher) return;
  dispatcher((cycleSubspan) => {
    const { timeSpanDto } = cycleSubspan;
    const zTimeOnly = time.toString();

    let updatedTimespan: TimeSpanDto;
    switch (target) {
      case 'Start':
        updatedTimespan = {
          ...timeSpanDto,
          startTimeDivisionInstant: zTimeOnly,
          startTimeDivisionId: TransientIdOffset
        };
        break;
      case 'End':
        updatedTimespan = {
          ...timeSpanDto,
          endTimeDivisionInstant: zTimeOnly,
          endTimeDivisionId: TransientIdOffset
        };
        break;
    }
    return { ...cycleSubspan, timeSpanDto: updatedTimespan };
  });
}

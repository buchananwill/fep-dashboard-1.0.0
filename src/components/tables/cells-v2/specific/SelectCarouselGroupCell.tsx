'use client';
import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { Button, Popover, Select } from '@mantine/core';
import { PencilSquareIcon, QueueListIcon } from '@heroicons/react/24/outline';
import { useDisclosure } from '@mantine/hooks';
import { NamespacedHooks, useDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import {
  CarouselGroupDto,
  CarouselOrderSummaryDto
} from '@/api/generated-types/generated-types';
import { nameAccessor } from '@/functions/nameSetter';
import { useCallback, useMemo } from 'react';

export function SelectCarouselGroupNameCell({
  value,
  ...props
}: IdInnerCellProps<string>) {
  const [isOpen, { open, close, toggle }] = useDisclosure();
  return (
    <>
      <Popover onClose={close} opened={isOpen} onChange={toggle} trapFocus>
        <Popover.Target>
          <Button
            leftSection={<QueueListIcon className={'w-6'} />}
            fullWidth
            onClick={toggle}
            variant={'subtle'}
          >
            {value}
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <SelectCarouselGroup value={value} {...props} />
        </Popover.Dropdown>
      </Popover>
    </>
  );
}

function SelectCarouselGroup({
  onChange,
  value,
  entityId,
  entityClass
}: IdInnerCellProps<string>) {
  const listenerKey = useUuidListenerKey();
  const { entity } = useDtoStore<CarouselOrderSummaryDto>({
    entityId,
    entityClass,
    listenerKey
  });
  const { currentState: carouselGroups } = NamespacedHooks.useListen(
    EntityClassMap.carouselGroup,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as CarouselGroupDto[]
  );
  const nameList = useMemo(() => {
    return carouselGroups.map(nameAccessor);
  }, [carouselGroups]);

  const propagateChange = useCallback(
    (selection: string | null) => {
      if (onChange && selection) onChange(selection);
    },
    [onChange]
  );

  return (
    <Select
      value={value}
      data={nameList}
      onChange={propagateChange}
      label={`Select Carousel Group for: ${entity.fName} ${entity.lName}`}
    />
  );
}

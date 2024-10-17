'use client';
import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { DeleteEntity } from '@/components/tables/cells/DeleteEntity';
import { useCallback } from 'react';
import { useGlobalDispatch } from 'selective-context';
import { workTaskTypeIdInModal } from '@/components/tables/edit-tables/WorkTaskTypeEditTable';
import { zIndexPopoverOverride } from '@/components/carousel-groups/orders/components/option/ShowAssigneesButton';

export function WorkTaskTypeActionCell(
  props: NextUiCellComponentProps<WorkTaskTypeDto>
) {
  const {
    entity: { id }
  } = props;
  const { dispatchWithoutListen } = useGlobalDispatch(workTaskTypeIdInModal);
  const openModal = useCallback(() => {
    dispatchWithoutListen(id);
  }, [dispatchWithoutListen, id]);

  return (
    <Popover placement="right" style={zIndexPopoverOverride}>
      <PopoverTrigger>
        <Button isIconOnly variant={'light'}>
          <EllipsisHorizontalIcon className={'stroke-1 text-default-700'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={'flex flex-row items-center gap-2'}>
        <Button onPress={openModal}>Edit Resource Requirements</Button>
        <DeleteEntity {...props} />
      </PopoverContent>
    </Popover>
  );
}

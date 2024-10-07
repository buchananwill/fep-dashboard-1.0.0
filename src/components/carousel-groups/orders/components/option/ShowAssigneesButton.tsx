import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import clsx from 'clsx';
import { Chip } from '@nextui-org/chip';
import OrderItemAssigneeList from '@/components/carousel-groups/orders/components/option/OrderItemAssigneeList';
import { memo } from 'react';
import { useRotationOverlayPositioning } from '@/components/carousel-groups/orders/components/option/useRotationOverlayPositioning';

export const zIndexPopoverOverride = { zIndex: 50 };

function ShowAssigneesButtonInner(props: {
  textFade: string | undefined;
  canDrop?: boolean;
  fallBackColor: 'default' | 'warning';
  workTaskType?: WorkTaskTypeDto | undefined;
  badgeColor: string;
  dragHappening?: boolean;
  carouselOptionDto: CarouselOptionStateInterface;
  isPrimed?: boolean;
  isAntiPrimed?: boolean;
}) {
  const assignChipRef = useRotationOverlayPositioning(
    props.isPrimed ?? false,
    props.isAntiPrimed ?? false,
    props.carouselOptionDto.workProjectSeriesSchemaId,
    props.carouselOptionDto
  );

  return (
    <Popover style={zIndexPopoverOverride}>
      <PopoverTrigger>
        <Button
          className={clsx(
            'flex w-full justify-between pl-2 pr-1',
            props.textFade
          )}
          color={props.canDrop ? 'primary' : props.fallBackColor}
        >
          <span className={'truncate'}>
            {props.workTaskType?.knowledgeDomain?.name}
          </span>
          <Chip
            className={clsx(props.badgeColor, props.textFade)}
            ref={assignChipRef}
          >
            {props.carouselOptionDto.carouselOrderAssignees.length}
          </Chip>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={clsx(
          !!props.dragHappening && 'opacity-10 ',
          'transition-opacity'
        )}
      >
        <div></div>
        <OrderItemAssigneeList carouselOptionDto={props.carouselOptionDto} />
      </PopoverContent>
    </Popover>
  );
}

export const ShowAssigneesButton = ShowAssigneesButtonInner; // memo(ShowAssigneesButtonInner);

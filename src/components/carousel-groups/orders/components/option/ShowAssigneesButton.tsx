'use client';
import { WorkTypeDto } from '@/api/generated-types/generated-types_';
import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';
import { Button, Popover } from '@mantine/core';
import clsx from 'clsx';
import OrderItemAssigneeList from '@/components/carousel-groups/orders/components/option/OrderItemAssigneeList';
import { useRotationOverlayPositioning } from '@/components/carousel-groups/orders/components/option/useRotationOverlayPositioning';
import { FallbackColors } from '@/components/carousel-groups/orders/components/option/CarouselOption';
import { useResizeObserver } from '@mantine/hooks';

export const zIndexPopoverOverride = { zIndex: 50 };

function ShowAssigneesButtonInner(props: {
  textFade: string | undefined;
  canDrop?: boolean;
  fallBackColor: FallbackColors;
  workType?: WorkTypeDto | undefined;
  badgeColor: string;
  dragHappening?: boolean;
  carouselOptionDto: CarouselOptionStateInterface;
  isPrimed?: boolean;
  isAntiPrimed?: boolean;
}) {
  const assignChipRef = useRotationOverlayPositioning(
    props.isPrimed ?? false,
    props.isAntiPrimed ?? false,
    props.carouselOptionDto
  );
  const [ref] = useResizeObserver();

  return (
    <Popover zIndex={100}>
      <Popover.Target>
        <Button
          autoContrast
          justify={'space-between'}
          fullWidth
          variant={'filled'}
          radius={'sm'}
          color={props.canDrop ? 'blue' : props.fallBackColor}
          rightSection={
            <div
              className={clsx(
                props.badgeColor,
                props.textFade,
                'relative rounded-xl px-2 py-1'
              )}
            >
              <div
                ref={assignChipRef}
                className={'absolute left-1/2 top-1/2'}
              ></div>
              <div ref={ref} className={'absolute'}></div>
              {props.carouselOptionDto.carouselOrderAssignees.length}
            </div>
          }
        >
          <span
            className={
              'center-vertical-with-margin inline-block truncate align-middle leading-normal'
            }
          >
            {props.workType?.knowledgeDomain?.name}
          </span>
        </Button>
      </Popover.Target>
      <Popover.Dropdown
        className={clsx(
          !!props.dragHappening && 'opacity-10 ',
          'transition-opacity'
        )}
      >
        <div></div>
        <OrderItemAssigneeList carouselOptionDto={props.carouselOptionDto} />
      </Popover.Dropdown>
    </Popover>
  );
}

export const ShowAssigneesButton = ShowAssigneesButtonInner; // memo(ShowAssigneesButtonInner);

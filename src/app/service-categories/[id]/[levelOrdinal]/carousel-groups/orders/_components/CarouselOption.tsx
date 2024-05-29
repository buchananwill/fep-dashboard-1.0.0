'use client';
import {
  DtoController,
  NamespacedHooks,
  useDtoStore,
  useDtoStoreDispatch,
  useEffectSyncDeepEqualWithDispatch,
  useLazyDtoStore
} from 'dto-stores';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import OptionAssigneeList from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionAssigneeList';
import { useDtoStoreController } from 'dto-stores/dist/hooks/internal/useDtoStoreController';
import { useEffect, useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import OrderItemAssigneeList from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderItemAssigneeList';
import { useGlobalWriteAny } from 'selective-context';
import { WriteAny } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import { produce } from 'immer';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { Badge, BadgeProps } from '@nextui-org/badge';
import clsx from 'clsx';
import ClashController from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/ClashController';
import { Chip } from '@nextui-org/chip';

export type CarouselOptionStateInterface = {
  id: number;
  carouselOrderAssignees: string[];
  clashMap: Map<string, CarouselOrderItemDto[]>;
  name?: string;
} & CarouselOptionDto;

export const CarouselOptionState = 'CarouselOptionState';
export default function CarouselOption({
  entity
}: {
  entity: CarouselOptionStateInterface;
}) {
  const { workProjectSeriesSchemaId } = entity;

  const { entity: stateEntity, dispatchWithoutControl } =
    useDtoStore<CarouselOptionStateInterface>({
      entityClass: CarouselOptionState,
      entityId: entity.id
    });

  const { entity: schema } = useLazyDtoStore<WorkProjectSeriesSchemaDto>(
    workProjectSeriesSchemaId,
    EntityClassMap.workProjectSeriesSchema
  );

  const { entity: workTaskType } = useLazyDtoStore<WorkTaskTypeDto>(
    schema?.workTaskTypeId ?? NaN,
    EntityClassMap.workTaskType
  );
  const { dispatchWriteAny } = useGlobalWriteAny<CarouselOrderDto>();

  useEffect(() => {
    if (stateEntity?.name !== workTaskType?.name && workTaskType)
      dispatchWithoutControl((state) => ({
        ...state,
        name: workTaskType.name
      }));
  }, [stateEntity, workTaskType, dispatchWithoutControl]);

  const [{ isOver, canDrop, currentItem, currentItemType }, drop] = useDrop(
    () => ({
      accept: DragTypes.CAROUSEL_ORDER_ITEM,
      drop: (item, monitor) =>
        assignOrderItemToOption(
          item as CarouselOrderItemDto,
          entity,
          dispatchWriteAny
        ),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        currentItem: monitor.getItem(),
        currentItemType: monitor.getItemType()
      }),
      canDrop: (item, monitor) =>
        canAssignToOrderItem(item as CarouselOrderItemDto, stateEntity)
    })
  );

  let fallBackColor: 'default' | 'warning' = 'default';
  if (currentItem && currentItemType === DragTypes.CAROUSEL_ORDER_ITEM) {
    const orderItem = currentItem as CarouselOrderItemDto;
    if (
      stateEntity.carouselOrderAssignees.includes(orderItem.carouselOrderId) &&
      entity.workProjectSeriesSchemaId !== orderItem.workProjectSeriesSchemaId
    )
      fallBackColor = 'warning';
  }

  const loading = !schema || !workTaskType;

  const assigneeCount = stateEntity.carouselOrderAssignees.length;

  const badgeColor = useMemo(() => {
    return schema
      ? getAssigneeCountColor(assigneeCount, schema)
      : 'bg-gray-300';
  }, [assigneeCount, schema]);

  return (
    <ClashBadge
      show={stateEntity.clashMap.size > 0}
      content={stateEntity.clashMap.size}
    >
      {drop(
        <div
          className={clsx(
            'w-full h-full overflow-visible relative ',
            isOver ? ' opacity-50' : ''
          )}
        >
          {loading ? (
            <PendingOverlay pending={true} />
          ) : (
            <Popover>
              <PopoverTrigger>
                <Button
                  className={clsx(
                    'w-full h-full px-3 flex justify-between',
                    assigneeCount === 0 && 'text-gray-400'
                  )}
                  color={canDrop ? 'primary' : fallBackColor}
                >
                  {workTaskType.name}:{' '}
                  <Chip
                    className={clsx(
                      badgeColor,
                      assigneeCount === 0 && 'text-gray-500'
                    )}
                  >
                    {stateEntity.carouselOrderAssignees.length}
                  </Chip>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <OrderItemAssigneeList carouselOptionDto={stateEntity} />
              </PopoverContent>
            </Popover>
          )}
        </div>
      )}
    </ClashBadge>
  );
}

function canAssignToOrderItem(
  orderItem: CarouselOrderItemDto,
  option: CarouselOptionDto
) {
  return (
    option.workProjectSeriesSchemaId === orderItem.workProjectSeriesSchemaId &&
    // orderItem.carouselOptionId !== option.id &&
    orderItem.active
  );
}

function assignOrderItemToOption(
  orderItem: CarouselOrderItemDto,
  option: CarouselOptionDto,
  dispatchWrite: WriteAny<CarouselOrderDto>
) {
  dispatchWrite(
    `${EntityClassMap.carouselOrder}:${orderItem.carouselOrderId}`,
    (state: CarouselOrderDto) => {
      return produce(state, (draft) => {
        draft.carouselOrderItems[
          orderItem.workProjectSeriesSchemaId
        ].carouselOptionId = option.id;
      });
    }
  );
}

export function ClashBadge({
  show,
  className,
  children,
  ...otherProps
}: Omit<BadgeProps, 'color'> & { show: boolean }) {
  return (
    <Badge
      className={clsx(show ? '' : 'hidden')}
      color={'danger'}
      {...otherProps}
    >
      {children}
    </Badge>
  );
}

function getAssigneeCountColor(
  count: number,
  schema: WorkProjectSeriesSchemaDto
) {
  if (count === 0) return 'bg-gray-300';
  const breakpointsPassed = count / schema.userToProviderRatio;
  if (breakpointsPassed <= 1) return 'bg-emerald-200';
  if (breakpointsPassed <= 2) return 'bg-yellow-100';
  if (breakpointsPassed <= 3) return 'bg-orange-200';
  if (breakpointsPassed <= 4) return 'bg-red-300';
  else return 'bg-fuchsia-300';
}

'use client';
import {
  DtoController,
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
import { useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import OrderItemAssigneeList from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderItemAssigneeList';
import { useGlobalWriteAny } from 'selective-context';
import { WriteAny } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import { produce } from 'immer';

export type CarouselOptionStateInterface = {
  id: number;
  carouselOrderAssignees: string[];
} & CarouselOptionDto;

export const CarouselOptionState = 'CarouselOptionState';
export default function CarouselOption({
  entity
}: {
  entity: CarouselOptionDto;
}) {
  const { workProjectSeriesSchemaId } = entity;

  const { entity: stateEntity } = useDtoStore<CarouselOptionStateInterface>({
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

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: DragTypes.CAROUSEL_ORDER_ITEM,
    drop: (item, monitor) =>
      assignOrderItemToOption(
        item as CarouselOrderItemDto,
        entity,
        dispatchWriteAny
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    canDrop: (item, monitor) =>
      canAssignToOrderItem(item as CarouselOrderItemDto, stateEntity)
  }));

  const loading = !schema || !workTaskType;

  return (
    <div className={`w-full h-full ${isOver ? ' opacity-50' : ''}`} ref={drop}>
      {loading ? (
        <PendingOverlay pending={true} />
      ) : (
        <Popover>
          <PopoverTrigger>
            <Button
              className={'w-full h-full'}
              color={canDrop ? 'primary' : 'default'}
            >
              {workTaskType.name}: {stateEntity.carouselOrderAssignees.length}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <OrderItemAssigneeList carouselOptionDto={stateEntity} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

function canAssignToOrder(order: CarouselOrderDto, option: CarouselOptionDto) {
  const carouselOrderItem =
    order.carouselOrderItems[option.workProjectSeriesSchemaId] ?? false;
  if (!carouselOrderItem) return false;
  else return canAssignToOrderItem(carouselOrderItem, option);
}

function canAssignToOrderItem(
  orderItem: CarouselOrderItemDto,
  option: CarouselOptionDto
) {
  return (
    option.workProjectSeriesSchemaId === orderItem.workProjectSeriesSchemaId &&
    orderItem.carouselOptionId !== option.id &&
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

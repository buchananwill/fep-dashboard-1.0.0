'use client';
import { useDtoStore, useDtoStoreDispatch, useLazyDtoStore } from 'dto-stores';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { useEffect, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import OrderItemAssigneeList from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderItemAssigneeList';
import {
  useGlobalController,
  useGlobalDispatchAndListener,
  useGlobalListener,
  useGlobalWriteAny
} from 'selective-context';
import { WriteAny } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import { produce } from 'immer';
import { Badge, BadgeProps } from '@nextui-org/badge';
import clsx from 'clsx';
import { Chip } from '@nextui-org/chip';
import { ButtonGroup } from '@nextui-org/react';
import { AcademicCapIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { AcademicCapIcon as AcademicCapIconFilled } from '@heroicons/react/24/solid';
import { EmptyArray } from '@/api/main';
import {
  ControllerKey,
  InitialSet
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselGroup';
import { b, f } from '@nextui-org/slider/dist/use-slider-64459b54';

export type CarouselOptionStateInterface = {
  id: number;
  carouselOrderAssignees: string[];
  clashMap: Map<string, CarouselOrderItemDto[]>;
  name?: string;
} & CarouselOptionDto;

export const CarouselOptionState = 'CarouselOptionState';
export default function CarouselOption({
  entity,
  canPrime
}: {
  entity: CarouselOptionStateInterface;
  canPrime?: boolean;
}) {
  const { workProjectSeriesSchemaId } = entity;

  // Highlighting subject section.
  const listenerKey = `${CarouselOptionState}:${entity.id}`;
  const {
    currentState: highlightedList,
    dispatchWithoutControl: highlightSubject
  } = useGlobalDispatchAndListener<string[]>({
    contextKey: 'highlightedSubjects',
    listenerKey: listenerKey,
    initialValue: EmptyArray
  });

  const isHighlighted = useMemo(() => {
    return highlightedList.includes(entity.workProjectSeriesSchemaId);
  }, [highlightedList, entity.workProjectSeriesSchemaId]);

  // Dispatch own state changes.
  const { dispatchWithoutListen } =
    useDtoStoreDispatch<CarouselOptionStateInterface>(
      entity.id,
      CarouselOptionState
    );

  // Subscribe to schema and work type data.
  const { entity: schema } = useLazyDtoStore<WorkProjectSeriesSchemaDto>(
    workProjectSeriesSchemaId,
    EntityClassMap.workProjectSeriesSchema
  );

  const { entity: workTaskType } = useLazyDtoStore<WorkTaskTypeDto>(
    schema?.workTaskTypeId ?? NaN,
    EntityClassMap.workTaskType
  );

  // Get the dispatch for editing any dropped order.
  const { dispatchWriteAny } = useGlobalWriteAny<CarouselOrderDto>();

  // Update own state with display name
  useEffect(() => {
    if (entity?.name !== workTaskType?.name && workTaskType)
      dispatchWithoutListen((state) => ({
        ...state,
        name: workTaskType.name
      }));
  }, [entity, workTaskType, dispatchWithoutListen]);

  // Get drag data and functions
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
        canAssignToOrderItem(item as CarouselOrderItemDto, entity)
    })
  );

  // Compute priming behaviour
  const {
    currentState: rotationPrimeList,
    dispatchWithoutControl: dispatchRotationPrime
  } = useGlobalDispatchAndListener({
    contextKey: 'rotationPrime',
    listenerKey: listenerKey,
    initialValue: EmptyArray
  });

  // const { currentState: filteredOrders } = useGlobalListener<Set<string>>({
  //   contextKey: 'filteredOrders',
  //   initialValue: InitialSet as Set<string>,
  //   listenerKey: listenerKey
  // });

  // const canPrime = useMemo(() => {
  //   return (
  //     entity.carouselOrderAssignees.length > 0 &&
  //     (rotationPrimeList.length === 0 ||
  //       entity.carouselOrderAssignees.some((order) =>
  //         filteredOrders.has(order)
  //       ))
  //   );
  // }, [entity.carouselOrderAssignees, filteredOrders, rotationPrimeList.length]);

  const isPrimed = useMemo(() => {
    return rotationPrimeList.includes(entity.id);
  }, [rotationPrimeList, entity.id]);

  // Compute dynamic styling
  let fallBackColor: 'default' | 'warning' = 'default';
  if (currentItem && currentItemType === DragTypes.CAROUSEL_ORDER_ITEM) {
    const orderItem = currentItem as CarouselOrderItemDto;
    if (
      entity.carouselOrderAssignees.includes(orderItem.carouselOrderId) &&
      entity.workProjectSeriesSchemaId !== orderItem.workProjectSeriesSchemaId
    )
      fallBackColor = 'warning';
  }

  const loading = !schema || !workTaskType;

  const assigneeCount = entity.carouselOrderAssignees.length;

  const textFade = assigneeCount === 0 ? 'text-gray-400' : undefined;

  const badgeColor = useMemo(() => {
    return schema
      ? getAssigneeCountColor(assigneeCount, schema)
      : 'bg-default-300';
  }, [assigneeCount, schema]);

  return (
    <ClashBadge show={entity.clashMap.size > 0} content={entity.clashMap.size}>
      {drop(
        <div
          className={clsx(
            'w-full overflow-visible relative ',
            isOver ? ' opacity-50' : ''
          )}
        >
          {loading ? (
            <PendingOverlay pending={true} />
          ) : (
            <ButtonGroup className={'w-full h-full flex justify-between'}>
              <Button
                className={'px-1 min-w-0 w-fit relative'}
                onPress={() =>
                  highlightSubject((list) => {
                    if (isHighlighted)
                      return list.filter(
                        (schemaId) =>
                          schemaId !== entity.workProjectSeriesSchemaId
                      );
                    else return [...list, entity.workProjectSeriesSchemaId];
                  })
                }
                color={canDrop ? 'primary' : fallBackColor}
              >
                <AcademicCapIconFilled
                  className={clsx(
                    'w-6',
                    isHighlighted && 'text-red-500',
                    !isHighlighted && 'opacity-0',
                    'absolute transition-colors-opacity'
                  )}
                />
                <AcademicCapIcon
                  className={clsx(
                    'w-6',
                    isHighlighted && 'opacity-0',
                    'transition-colors-opacity',
                    textFade
                  )}
                />
              </Button>
              <Button
                isIconOnly
                isDisabled={!canPrime}
                className={clsx(
                  'min-w-0 w-fit px-1',
                  'data-[disabled]:bg-zinc-400',
                  'data-[disabled]:text-zinc-400'
                )}
                color={canDrop ? 'primary' : fallBackColor}
                onPress={() => {
                  dispatchRotationPrime((list) => {
                    if (isPrimed)
                      return list.filter((idItem) => idItem !== entity.id);
                    else return [...list, entity.id];
                  });
                }}
              >
                <ArrowPathIcon
                  className={clsx(
                    'w-6 py-0.5 px-0',
                    isPrimed && 'animate-spinner-ease-spin',
                    textFade
                  )}
                />
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Button
                    className={clsx(
                      'w-full pl-1 pr-1 flex justify-between',
                      textFade
                    )}
                    color={canDrop ? 'primary' : fallBackColor}
                  >
                    <span className={'truncate'}>{workTaskType.name}</span>
                    <Chip className={clsx(badgeColor, textFade)}>
                      {entity.carouselOrderAssignees.length}
                    </Chip>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={clsx(
                    !!currentItem && 'opacity-10 ',
                    'transition-opacity'
                  )}
                >
                  <div></div>
                  <OrderItemAssigneeList carouselOptionDto={entity} />
                </PopoverContent>
              </Popover>
            </ButtonGroup>
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

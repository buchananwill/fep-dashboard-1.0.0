'use client';
import {
  useDtoStoreDispatch,
  useLazyDtoStore,
  useWriteAnyDto
} from 'dto-stores';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { useEffect, useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import OrderItemAssigneeList from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderItemAssigneeList';
import {
  useGlobalDispatch,
  useGlobalDispatchAndListener,
  useGlobalListener,
  useGlobalWriteAny
} from 'selective-context';
import { Badge, BadgeProps } from '@nextui-org/badge';
import clsx from 'clsx';
import { Chip } from '@nextui-org/chip';
import { ButtonGroup } from '@nextui-org/react';
import { AcademicCapIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import {
  AcademicCapIcon as AcademicCapIconFilled,
  ArrowDownIcon
} from '@heroicons/react/24/solid';
import { EmptyArray } from '@/api/main';
import { assignOrderItemToOption } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/assignOrderItemToOption';
import { hidden } from 'next/dist/lib/picocolors';
import { useSineLutContext } from 'react-d3-force-graph';
import {
  ConnectionVector,
  RotationConnectionMap
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/RotationConnectionOverlay';
import {
  OptionRotationTarget,
  OptionRotationTargets
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionRotationButtonGroup';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';

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
  // Chip location calculation condition: primed or anti-primed
  const assignChipRef = useRef<HTMLDivElement | null>(null);
  const { dispatchWithoutListen: dispatchConnectionMap } = useGlobalDispatch<
    Map<string, ConnectionVector>
  >(RotationConnectionMap);
  const primeState = useRef({ prime: false, antiPrime: false });

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
  const dispatchWriteAny = useWriteAnyDto<CarouselOrderDto>(
    EntityClassMap.carouselOrder
  );

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

  const isPrimed = useMemo(() => {
    return rotationPrimeList.includes(entity.id);
  }, [rotationPrimeList, entity.id]);

  // Compute anti-priming behaviour
  const { currentState: rotationTargetsMap } = useGlobalListener({
    contextKey: OptionRotationTargets,
    listenerKey: listenerKey,
    initialValue: initialMap as Map<number, OptionRotationTarget>
  });

  const isAntiPrimed = rotationTargetsMap.has(entity.id);

  /*
   *  Use prime/anti-prime to signal connection location.
   *  CURRENTLY: HAS TO RUN EVERY RENDER, IN CASE THE ORDER OF OPTIONS CHANGED.
   *  TODO: Track the carousel option order?
   * */
  useEffect(() => {
    const primeChange = primeState.current.prime !== isPrimed;
    const antiPrimeChange = primeState.current.antiPrime !== isAntiPrimed;

    if (
      assignChipRef.current &&
      (primeChange || antiPrimeChange || isPrimed || isAntiPrimed)
    ) {
      const { top, left, width, height } =
        assignChipRef.current.getBoundingClientRect();
      const center = {
        x: left + width / 2,
        y: top + height / 2
      };

      dispatchConnectionMap((currentMap) => {
        const map = new Map(currentMap);
        const currentConnection = map.get(workProjectSeriesSchemaId);
        const updatedConnection: ConnectionVector = {
          ...currentConnection
        };
        if (isPrimed) {
          updatedConnection.source = center;
        } else if (isAntiPrimed) {
          updatedConnection.target = center;
        }
        map.set(workProjectSeriesSchemaId, updatedConnection);
        return map;
      });
    }
    primeState.current = { prime: isPrimed, antiPrime: isAntiPrimed };
  });

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
                    <Chip
                      className={clsx(badgeColor, textFade)}
                      ref={assignChipRef}
                    >
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
              <Button
                isIconOnly
                isDisabled={!canPrime}
                className={clsx(
                  'min-w-0 w-fit px-1  opacity-100',
                  !canDrop && 'data-[disabled]:bg-default-300'
                )}
                color={
                  isPrimed ? 'success' : canDrop ? 'primary' : fallBackColor
                }
                onPress={() => {
                  dispatchRotationPrime((list) => {
                    if (isPrimed)
                      return list.filter((idItem) => idItem !== entity.id);
                    else return [...list, entity.id];
                  });
                }}
              >
                <ArrowDownIcon
                  className={clsx(
                    'w-6 py-0.5 px-0',
                    isPrimed && 'animate-bounce-less',
                    textFade,
                    !canPrime && 'opacity-0'
                  )}
                  // style={{ transform: `translateY(${sineLutSync}%)` }}
                />
              </Button>
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

function useConnectionRefStore(
  primeState,
  isAntiPrimed,
  isPrimed,
  assignChipRef,
  workProjectSeriesSchemaId,
  dispatchConnectionMap
) {
  useEffect(() => {
    const primeChange = primeState.current.prime !== isPrimed;
    const antiPrimeChange = primeState.current.antiPrime !== isAntiPrimed;

    if (
      assignChipRef.current &&
      (primeChange || antiPrimeChange || isPrimed || isAntiPrimed)
    ) {
      const { top, left, width, height } =
        assignChipRef.current.getBoundingClientRect();
      const center = {
        x: left + width / 2,
        y: top + height / 2
      };

      dispatchConnectionMap((currentMap) => {
        const map = new Map(currentMap);
        const currentConnection = map.get(workProjectSeriesSchemaId);
        const updatedConnection: ConnectionVector = {
          ...currentConnection
        };
        if (isPrimed) {
          updatedConnection.source = center;
        } else if (isAntiPrimed) {
          updatedConnection.target = center;
        }
        map.set(workProjectSeriesSchemaId, updatedConnection);
        return map;
      });
    }
    primeState.current = { prime: isPrimed, antiPrime: isAntiPrimed };
  });
}

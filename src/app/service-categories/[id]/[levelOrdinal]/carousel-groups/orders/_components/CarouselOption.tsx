'use client';
import {
  useDtoStoreDispatch,
  useLazyDtoStore,
  useWriteAnyDto
} from 'dto-stores';
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
  useGlobalListener
} from 'selective-context';
import clsx from 'clsx';
import { Chip } from '@nextui-org/chip';
import { ButtonGroup } from '@nextui-org/react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import {
  AcademicCapIcon as AcademicCapIconFilled,
  ArrowDownIcon
} from '@heroicons/react/24/solid';
import { assignOrderItemToOption } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/assignOrderItemToOption';

import { OptionRotationTargets } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionRotationButtonGroup';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import {
  CarouselOptionStateInterface,
  OptionRotationTarget
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';
import { HighlightedSubjects } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_literals';
import { canAssignToOrderItem } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/canAssignOptionToOrderItem';
import { ClashBadge } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/ClashBadge';
import { getAssigneeCountColor } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/getAssigneeCountColor';
import { EmptyArray } from '@/api/literals';
import {
  ConnectionVector,
  RotationConnectionMap
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/RotationConnectionOverlay';

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
    contextKey: HighlightedSubjects,
    listenerKey: listenerKey,
    initialValue: EmptyArray
  });

  const isHighlighted = useMemo(() => {
    return highlightedList.includes(entity.workProjectSeriesSchemaId);
  }, [highlightedList, entity.workProjectSeriesSchemaId]);

  // For dispatching own state changes.
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
          updatedConnection.source = { ...center, id: entity.id };
        } else if (!isPrimed && primeChange) {
          updatedConnection.source =
            updatedConnection.source?.id === entity.id
              ? undefined
              : updatedConnection.source;
        } else if (isAntiPrimed) {
          updatedConnection.target = { ...center, id: entity.id };
        } else if (!isAntiPrimed && antiPrimeChange) {
          updatedConnection.target =
            updatedConnection.target?.id === entity.id
              ? undefined
              : updatedConnection.target;
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
              <Popover>
                <PopoverTrigger>
                  <Button
                    className={clsx(
                      'w-full pl-2 pr-1 flex justify-between',
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
                />
              </Button>
            </ButtonGroup>
          )}
        </div>
      )}
    </ClashBadge>
  );
}

'use client';
import { useDtoStore, useDtoStoreDispatch, useWriteAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';

import OrderItemAssigneeList from '@/components/carousel-groups/orders/components/OrderItemAssigneeList';
import {
  useGlobalDispatch,
  useGlobalDispatchAndListener,
  useGlobalListener
} from 'selective-context';
import clsx from 'clsx';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import {
  AcademicCapIcon as AcademicCapIconFilled,
  ArrowDownIcon
} from '@heroicons/react/24/solid';
import { assignOrderItemToOption } from '@/components/carousel-groups/orders/_functions/assignOrderItemToOption';

import { OptionRotationTargets } from '@/components/carousel-groups/orders/components/OptionRotationButtonGroup';
import {
  CarouselOptionStateInterface,
  OptionRotationTarget
} from '@/components/carousel-groups/orders/_types';
import {
  HighlightedSubjects,
  RotationPrime
} from '@/components/carousel-groups/orders/_literals';
import { canAssignToOrderItem } from '@/components/carousel-groups/orders/_functions/canAssignOptionToOrderItem';
import { ClashBadge } from '@/components/carousel-groups/orders/components/ClashBadge';
import { getAssigneeCountColor } from '@/components/carousel-groups/orders/_functions/getAssigneeCountColor';
import { EmptyArray } from '@/api/literals';
import {
  ConnectionVector,
  RotationConnectionMap
} from '@/components/carousel-groups/orders/components/RotationConnectionOverlay';
import { initialMap } from '@/app/_literals';
import {
  CarouselOrderDto,
  CarouselOrderItemDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types';
import { Popover } from 'react-tiny-popover';

export const CarouselOptionState = 'CarouselOptionState';
export const zIndexPopoverOverride = { zIndex: 50 };
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
    Map<number, ConnectionVector>
  >(RotationConnectionMap);
  const primeState = useRef({ prime: false, antiPrime: false });

  // Highlighting subject section.
  const listenerKey = `${CarouselOptionState}:${entity.id}`;
  const {
    currentState: highlightedList,
    dispatchWithoutControl: highlightSubject
  } = useGlobalDispatchAndListener<number[]>({
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
  const { entity: schema } = useDtoStore<WorkProjectSeriesSchemaDto>({
    entityId: workProjectSeriesSchemaId,
    entityClass: EntityClassMap.workProjectSeriesSchema,
    listenerKey: `carouselOption:${entity.id}`
  });

  // const { entity: workTaskType } = useLazyDtoStore<WorkTaskTypeDto>(
  //   schema?.workTaskType?.id ?? NaN,
  //   EntityClassMap.workTaskType
  // );

  const workTaskType = schema?.workTaskType;

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
    contextKey: RotationPrime,
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
  let fallBackColorBg: 'bg-default-300' | 'bg-warning-300' = 'bg-default-300';
  if (currentItem && currentItemType === DragTypes.CAROUSEL_ORDER_ITEM) {
    const orderItem = currentItem as CarouselOrderItemDto;
    if (
      entity.carouselOrderAssignees.includes(orderItem.carouselOrderId) &&
      entity.workProjectSeriesSchemaId !== orderItem.workProjectSeriesSchemaId
    ) {
      fallBackColor = 'warning';
      fallBackColorBg = 'bg-warning-300';
    }
  }

  const loading = !schema || !workTaskType;

  const assigneeCount = entity.carouselOrderAssignees.length;

  const textFade = assigneeCount === 0 ? 'text-gray-400' : undefined;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const badgeColor = useMemo(() => {
    return schema
      ? getAssigneeCountColor(assigneeCount, schema)
      : 'bg-default-300';
  }, [assigneeCount, schema]);

  return (
    <ClashMemo show={entity.clashMap.size > 0} content={entity.clashMap.size}>
      {drop(
        <div
          className={clsx(
            'relative w-full overflow-visible ',
            isOver ? ' opacity-50' : ''
          )}
        >
          {loading ? (
            <PendingOverlay pending={true} />
          ) : (
            <div className={'flex h-full w-full justify-between'}>
              <Popover
                isOpen={isPopoverOpen}
                content={
                  <div className={'rounded-large bg-white p-2 shadow-large'}>
                    <OrderItemAssigneeList carouselOptionDto={entity} />
                  </div>
                }
              >
                <button
                  onClick={() => setIsPopoverOpen((prev) => !prev)}
                  className={clsx(
                    'flex h-full w-full justify-between rounded-lg pl-2 pr-1',
                    canDrop ? 'bg-primary-300' : fallBackColorBg,
                    textFade
                  )}
                >
                  <span className={'truncate'}>
                    {workTaskType.knowledgeDomain?.name}
                  </span>
                  <div
                    className={clsx(
                      badgeColor,
                      textFade,
                      'min-w-10 rounded-full p-1'
                    )}
                    ref={assignChipRef}
                  >
                    {entity.carouselOrderAssignees.length}
                  </div>
                </button>
              </Popover>
              <button
                className={clsx(
                  'relative flex h-full w-fit rounded-lg p-1',
                  canDrop ? 'bg-primary-300' : fallBackColorBg
                )}
                onClick={() =>
                  highlightSubject((list) => {
                    if (isHighlighted)
                      return list.filter(
                        (schemaId) =>
                          schemaId !== entity.workProjectSeriesSchemaId
                      );
                    else return [...list, entity.workProjectSeriesSchemaId];
                  })
                }
              >
                <MemoCapFilled
                  className={clsx(
                    'w-6',
                    isHighlighted && 'text-red-500',
                    !isHighlighted && 'opacity-0',
                    'absolute transition-colors-opacity'
                  )}
                />
                <MemoCap
                  className={clsx(
                    'w-6',
                    isHighlighted && 'opacity-0',
                    'transition-colors-opacity',
                    textFade
                  )}
                />
              </button>
              <button
                disabled={!canPrime}
                className={clsx(
                  'inline-block h-full w-fit rounded-lg px-1 opacity-100',
                  !canDrop && 'data-[disabled]:bg-default-300',
                  isPrimed
                    ? 'bg-success-400'
                    : canDrop
                      ? 'bg-primary-400'
                      : fallBackColorBg
                )}
                onClick={() => {
                  dispatchRotationPrime((list) => {
                    if (isPrimed)
                      return list.filter((idItem) => idItem !== entity.id);
                    else return [...list, entity.id];
                  });
                }}
              >
                <ArrowMemo
                  className={clsx(
                    'w-6 px-0 py-0.5',
                    isPrimed && 'animate-bounce-less',
                    textFade,
                    !canPrime && 'opacity-0'
                  )}
                />
              </button>
            </div>
          )}
        </div>
      )}
    </ClashMemo>
  );
}

const MemoCap = memo(AcademicCapIcon);
const MemoCapFilled = memo(AcademicCapIconFilled);
const ClashMemo = memo(ClashBadge);
const ArrowMemo = memo(ArrowDownIcon);

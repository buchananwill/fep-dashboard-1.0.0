'use client';
import { useDtoStore, useDtoStoreDispatch, useWriteAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { memo, useEffect, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { DragTypes } from '@/components/react-dnd/literals';
import {
  useGlobalDispatchAndListener,
  useGlobalListener
} from 'selective-context';
import clsx from 'clsx';
import { ButtonGroup } from '@nextui-org/react';
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
import { ClashBadge } from '@/components/generic/ClashBadge';
import { getAssigneeCountColor } from '@/components/carousel-groups/orders/_functions/getAssigneeCountColor';
import { EmptyArray } from '@/api/literals';
import { initialMap } from '@/app/_literals';
import {
  CarouselOrderDto,
  CarouselOrderItemDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types';
import { RotationPrimeButton } from '@/components/carousel-groups/orders/components/option/RotationPrimeButton';
import { HighlightMatchingSchemasButton } from '@/components/carousel-groups/orders/components/option/HighlightMatchingSchemasButton';
import { ShowAssigneesButton } from '@/components/carousel-groups/orders/components/option/ShowAssigneesButton';

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

  // Compute dynamic styling
  let fallBackColor: 'default' | 'warning' = 'default';
  if (currentItem && currentItemType === DragTypes.CAROUSEL_ORDER_ITEM) {
    const orderItem = currentItem as CarouselOrderItemDto;
    if (
      entity.carouselOrderAssignees.includes(orderItem.carouselOrderId) &&
      entity.workProjectSeriesSchemaId !== orderItem.workProjectSeriesSchemaId
    ) {
      fallBackColor = 'warning';
    }
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
            'relative w-full overflow-visible ',
            isOver ? ' opacity-50' : ''
          )}
        >
          {loading ? (
            <PendingOverlay pending={true} />
          ) : (
            <div className={'flex h-full w-full justify-between'}>
              <ShowAssigneesButton
                textFade={textFade}
                canDrop={canDrop}
                fallBackColor={fallBackColor}
                workTaskType={workTaskType}
                badgeColor={badgeColor}
                dragHappening={!!currentItem}
                carouselOptionDto={entity}
                isAntiPrimed={isAntiPrimed}
                isPrimed={isPrimed}
              />
              <HighlightMatchingSchemasButton
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
                canDrop={canDrop}
                fallBackColor={fallBackColor}
                highlighted={isHighlighted}
                textFade={textFade}
              />
              <RotationPrimeButton
                canPrime={canPrime}
                canDrop={canDrop}
                primed={isPrimed}
                fallBackColor={fallBackColor}
                onPress={() => {
                  dispatchRotationPrime((list) => {
                    if (isPrimed)
                      return list.filter((idItem) => idItem !== entity.id);
                    else return [...list, entity.id];
                  });
                }}
                textFade={textFade}
              />
            </div>
          )}
        </div>
      )}
    </ClashBadge>
  );
}

const ClashMemo = memo(ClashBadge);

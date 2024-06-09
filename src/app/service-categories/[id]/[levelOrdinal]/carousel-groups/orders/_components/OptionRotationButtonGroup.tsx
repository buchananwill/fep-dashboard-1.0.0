'use client';
import { Button } from '@nextui-org/button';
import { ButtonGroup } from '@nextui-org/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  useGlobalController,
  useGlobalDispatch,
  useGlobalDispatchAndListener
} from 'selective-context';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { isNotUndefined } from '@/api/main';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  findHamiltonianCycle,
  getOptionConnectionValidator,
  validateHamiltonianCycle
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/carouselOptionsCanConnect';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { assignOrderItemToOption } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/assignOrderItemToOption';
import { useReadAnyDto, useWriteAnyDto } from 'dto-stores';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import CarouselOrderList from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderList';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

import clsx from 'clsx';
import { ControllerKey, InitialSet } from '@/app/_literals';
import {
  FilteredOrders,
  RotationPrime
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_literals';
import { findAssigneeIntersection } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/findAssigneeIntersection';
import {
  CarouselOptionStateInterface,
  OptionRotationTarget
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import {
  ConnectionVector,
  RotationConnectionMap
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/RotationConnectionOverlay';

export type OptionRotationDirection = 'forwards' | 'backwards';
type RotationCycle = {
  [key in keyof OptionRotationDirection]:
    | CarouselOptionStateInterface[]
    | undefined;
};

export const OptionRotationTargets = 'optionRotationTargets';
export default function OptionRotationButtonGroup() {
  const readAnyCarousel = useReadAnyDto<CarouselDto>(EntityClassMap.carousel);
  const readAnyOption =
    useReadAnyDto<CarouselOptionStateInterface>(CarouselOptionState);
  const readAnyOrder = useReadAnyDto<CarouselOrderDto>(
    EntityClassMap.carouselOrder
  );
  const listenerKey = useUuidListenerKey();
  const [optionRotation, setOptionRotation] = useState<
    OptionRotationDirection | undefined
  >();
  const {
    currentState: rotationPrimeList,
    dispatchWithoutControl: dispatchPrimeList
  } = useGlobalDispatchAndListener({
    contextKey: RotationPrime,
    listenerKey,
    initialValue: EmptyArray as number[]
  });

  const { dispatchWithoutListen: dispatchConnectionMap } = useGlobalDispatch<
    Map<string, ConnectionVector>
  >(RotationConnectionMap);

  const { currentState, dispatchWithoutControl: dispatchFilteredOrders } =
    useGlobalDispatchAndListener<Set<string>>({
      contextKey: FilteredOrders,
      initialValue: InitialSet as Set<string>,
      listenerKey
    });

  const filteredOrdersRef = useRef(currentState);
  filteredOrdersRef.current = currentState;
  const filteredOrders = filteredOrdersRef.current;

  useEffect(() => {
    filteredOrdersRef.current = findAssigneeIntersection(
      rotationPrimeList,
      readAnyOption
    );
    dispatchFilteredOrders(filteredOrdersRef.current);
  }, [dispatchFilteredOrders, rotationPrimeList, readAnyOption]);

  const { dispatch: dispatchRotationTargets } = useGlobalController({
    contextKey: OptionRotationTargets,
    initialValue: initialMap as Map<number, OptionRotationTarget>,
    listenerKey: ControllerKey
  });

  const writeAnyOrder = useWriteAnyDto<CarouselOrderDto>(
    EntityClassMap.carouselOrder
  );

  const sortingFunction = useCallback(
    (
      optionA: CarouselOptionStateInterface,
      optionB: CarouselOptionStateInterface
    ) => {
      const carouselOrdinalA = readAnyCarousel(
        optionA.carouselId
      )?.carouselOrdinal;
      const carouselOrdinalB = readAnyCarousel(
        optionB.carouselId
      )?.carouselOrdinal;
      if (
        !(isNotUndefined(carouselOrdinalA) && isNotUndefined(carouselOrdinalB))
      )
        throw Error('unable to find a carousel');
      return carouselOrdinalA - carouselOrdinalB;
    },
    [readAnyCarousel]
  );

  const cycles = useMemo(() => {
    const optionNodeList = rotationPrimeList
      .map((optionId) => readAnyOption(optionId))
      .filter(isNotUndefined);
    if (rotationPrimeList.length !== optionNodeList.length)
      throw Error('Options not found in store.');
    const forwardsList = optionNodeList.toSorted(sortingFunction);
    let forwardsCycle = findHamiltonianCycle(forwardsList, readAnyCarousel);

    forwardsCycle?.sort(sortingFunction);
    const validator = getOptionConnectionValidator(readAnyCarousel);

    let backwardsCycle = forwardsCycle?.toReversed();
    if (backwardsCycle) {
      backwardsCycle = validateHamiltonianCycle(backwardsCycle, validator)
        ? backwardsCycle
        : undefined;
    }

    if (forwardsCycle)
      forwardsCycle = validateHamiltonianCycle(forwardsCycle, validator)
        ? forwardsCycle
        : undefined;

    return { forwards: forwardsCycle, backwards: backwardsCycle };
  }, [rotationPrimeList, readAnyCarousel, readAnyOption, sortingFunction]);
  const { forwards, backwards } = cycles;

  const backwardsCycleRef = useRef(backwards);
  const forwardsCycleRef = useRef(forwards);

  const rotationNotFeasible = filteredOrders.size === 0;
  const forwardNotFeasible = forwards === undefined || rotationNotFeasible;
  const backwardsNotFeasible = backwards === undefined || rotationNotFeasible;
  const backwardsPrimed = optionRotation === 'backwards';
  const forwardsPrimed = optionRotation === 'forwards';

  const calculateNextRotation = useCallback(
    (
      optionList: CarouselOptionStateInterface[],
      filteredOrderList: string[]
    ) => {
      const orderId = filteredOrderList[0];

      const order = readAnyOrder(orderId);
      if (order === undefined)
        throw Error(`could not find carousel order: ${orderId}`);
      const optionRotations = new Map<number, OptionRotationTarget>();
      for (let i = 0; i < optionList.length; i++) {
        const carouselOrderItem =
          order.carouselOrderItems[optionList[i].workProjectSeriesSchemaId];
        // SAFETY CHECK TO UNDERSTAND BUG ...
        if (carouselOrderItem === undefined) {
          console.warn(
            'no order item for ',
            optionList[i].workProjectSeriesSchemaId
          );
          return new Map<number, OptionRotationTarget>();
        }
        // ... END SAFETY CHECK
        const nextCarouselId =
          optionList[(i + 1) % optionList.length].carouselId;
        const nextCarousel = readAnyCarousel(nextCarouselId);
        const nextOption = nextCarousel?.carouselOptionDtos?.find(
          (option) =>
            option.workProjectSeriesSchemaId ===
            carouselOrderItem.workProjectSeriesSchemaId
        );
        if (nextOption === undefined) throw Error(`Could not find option!`);
        optionRotations.set(nextOption.id, {
          carouselOrderItem,
          nextOption
        });
      }
      return optionRotations;
    },
    [readAnyOrder, readAnyCarousel]
  );

  // Update the displayed rotation effect if that is selected.
  useEffect(() => {
    if (
      optionRotation !== undefined &&
      (forwardsCycleRef.current !== forwards ||
        backwardsCycleRef.current !== backwards)
    ) {
      const cycle =
        optionRotation === 'backwards'
          ? backwards
          : optionRotation === 'forwards'
            ? forwards
            : undefined;

      if (cycle) {
        const targets = calculateNextRotation(cycle, [
          ...filteredOrdersRef.current.values()
        ]);
        dispatchRotationTargets(targets);
      } else {
        dispatchRotationTargets(new Map());
        setOptionRotation(undefined);
      }
    }
    forwardsCycleRef.current = forwards;
    backwardsCycleRef.current = backwards;
  }, [
    calculateNextRotation,
    backwards,
    forwards,
    optionRotation,
    dispatchRotationTargets,
    filteredOrders
  ]);

  useEffect(() => {
    dispatchConnectionMap((oldMap) => {
      if (optionRotation === undefined) return new Map();
      const map = new Map(oldMap);
      const schemaIdList = rotationPrimeList
        .map((primedId) => readAnyOption(primedId))
        .filter(isNotUndefined)
        .map((option) => option.workProjectSeriesSchemaId);
      for (let [idKey] of oldMap.entries()) {
        if (!schemaIdList.includes(idKey)) {
          map.delete(idKey);
        }
      }
      return map;
    });
  }, [rotationPrimeList, dispatchConnectionMap, readAnyOption, optionRotation]);

  const commitNextRotation = useCallback(
    (targetsMap: Map<number, OptionRotationTarget>) => {
      const cycleShifts = [...targetsMap.values()];
      if (cycleShifts.length < 2)
        throw Error('Need two targets to rotate orders.');
      const orderId = cycleShifts[0].carouselOrderItem.carouselOrderId;
      cycleShifts.forEach(({ carouselOrderItem, nextOption }) =>
        assignOrderItemToOption(carouselOrderItem, nextOption, writeAnyOrder)
      );
      filteredOrdersRef.current = new Set(currentState);
      filteredOrdersRef.current.delete(orderId);
      dispatchFilteredOrders(filteredOrdersRef.current);
      if (filteredOrdersRef.current.size === 0) {
        dispatchPrimeList([]);
        dispatchRotationTargets(new Map());
        dispatchConnectionMap(new Map());
      }
    },
    [
      dispatchFilteredOrders,
      writeAnyOrder,
      dispatchPrimeList,
      dispatchRotationTargets,
      dispatchConnectionMap,
      currentState
    ]
  );

  const toggleRotationOutcomeOverlay = useCallback(
    (
      toggleDirection: OptionRotationDirection,
      currentDirection: OptionRotationDirection | undefined
    ) => {
      const cycle = cycles[toggleDirection];
      if (cycle && currentDirection !== toggleDirection) {
        const nextRotation = calculateNextRotation(cycle, [
          ...filteredOrders.values()
        ]);
        dispatchRotationTargets(nextRotation);
        setOptionRotation(toggleDirection);
      } else if (currentDirection === toggleDirection) {
        setOptionRotation(undefined);
        dispatchRotationTargets(new Map());
      }
    },
    [cycles, calculateNextRotation, dispatchRotationTargets, filteredOrders]
  );

  return (
    <ButtonGroup>
      <Button
        isDisabled={backwardsNotFeasible || forwardsPrimed}
        onPress={() => {
          if (backwards)
            commitNextRotation(
              calculateNextRotation(backwards, [...filteredOrders.values()])
            );
        }}
        className={'px-4 min-w-0'}
      >
        <ChevronLeftIcon
          className={clsx(
            'w-6',
            optionRotation === 'backwards' && 'animate-nudge-left'
          )}
        />
      </Button>
      <Button
        className={'min-w-0 px-1'}
        isDisabled={backwardsNotFeasible}
        onPress={() =>
          toggleRotationOutcomeOverlay('backwards', optionRotation)
        }
      >
        <QuestionMarkCircleIcon className={'w-6'} />
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button className={'w-12'} isDisabled={filteredOrders.size === 0}>
            {filteredOrders.size}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className={'grid grid-cols-4 gap-1'}>
            <CarouselOrderList orderIdList={[...filteredOrders.values()]} />
          </div>
        </PopoverContent>
      </Popover>
      <Button
        className={'min-w-0 px-1'}
        isDisabled={forwardNotFeasible}
        onPress={() => toggleRotationOutcomeOverlay('forwards', optionRotation)}
      >
        <QuestionMarkCircleIcon className={'w-6'} />
      </Button>
      <Button
        isDisabled={forwardNotFeasible || backwardsPrimed}
        onPress={() => {
          if (forwards)
            commitNextRotation(
              calculateNextRotation(forwards, [...filteredOrders.values()])
            );
        }}
        className={'px-4 min-w-0'}
      >
        <ChevronRightIcon
          className={clsx(
            'w-6 ',
            optionRotation === 'forwards' && 'animate-nudge-right'
          )}
        />
      </Button>
    </ButtonGroup>
  );
}

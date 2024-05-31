'use client';
import { Button } from '@nextui-org/button';
import { ButtonGroup } from '@nextui-org/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  useGlobalController,
  useGlobalDispatch,
  useGlobalDispatchAndListener,
  useGlobalWriteAny
} from 'selective-context';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import {
  CarouselOptionState,
  CarouselOptionStateInterface
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import {
  ControllerKey,
  InitialSet,
  RotationPrime
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselGroup';
import { EmptyArray, isNotUndefined } from '@/api/main';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  findHamiltonianCycle,
  getOptionConnectionValidator,
  validateHamiltonianCycle
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/carouselOptionsCanConnect';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { assignOrderItemToOption } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/assignOrderItemToOption';
import { useReadAnyDto, useWriteAnyDto } from 'dto-stores';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import CarouselOrderList from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderList';
import { CarouselOrderItemDto } from '@/api/dtos/CarouselOrderItemDtoSchema';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import {
  ConnectionVector,
  RotationConnectionMap
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/RotationConnectionOverlay';
import { d } from '@nextui-org/slider/dist/use-slider-64459b54';

export interface OptionRotationTarget {
  carouselOrderItem: CarouselOrderItemDto;
  nextOption: CarouselOptionDto;
}

const listenerKey = 'optionRotationButtonGroup';
export const OptionRotationTargets = 'optionRotationTargets';
export default function OptionRotationButtonGroup() {
  const readAnyCarousel = useReadAnyDto<CarouselDto>(EntityClassMap.carousel);
  const readAnyOption =
    useReadAnyDto<CarouselOptionStateInterface>(CarouselOptionState);
  const readAnyOrder = useReadAnyDto<CarouselOrderDto>(
    EntityClassMap.carouselOrder
  );
  const [optionRotation, setOptionRotation] = useState<
    'forwards' | 'backwards' | undefined
  >();
  const {
    currentState: rotationPrimeList,
    dispatchWithoutControl: dispatchPrimeList
  } = useGlobalDispatchAndListener({
    contextKey: RotationPrime,
    listenerKey,
    initialValue: EmptyArray as number[]
  });
  const primeListRef = useRef(rotationPrimeList);

  const { dispatchWithoutListen: dispatchConnectionMap } = useGlobalDispatch<
    Map<string, ConnectionVector>
  >(RotationConnectionMap);

  const { currentState: filteredOrders, dispatch } = useGlobalController<
    Set<string>
  >({
    contextKey: 'filteredOrders',
    initialValue: InitialSet as Set<string>,
    listenerKey
  });

  const {
    currentState: rotationTargetsMap,
    dispatch: dispatchRotationTargets
  } = useGlobalController({
    contextKey: OptionRotationTargets,
    initialValue: initialMap as Map<number, OptionRotationTarget>,
    listenerKey: ControllerKey
  });
  const rotationTargetsMapRef = useRef(rotationTargetsMap);

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

  const { forwardsCycle, backwardsCycle } = useMemo(() => {
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

    return { forwardsCycle, backwardsCycle };
  }, [rotationPrimeList, readAnyCarousel, readAnyOption, sortingFunction]);

  const backwardsCycleRef = useRef(backwardsCycle);
  const forwardsCycleRef = useRef(forwardsCycle);

  const rotationNotFeasible = filteredOrders.size === 0;
  const forwardNotFeasible = forwardsCycle === undefined || rotationNotFeasible;
  const backwardsNotFeasible =
    backwardsCycle === undefined || rotationNotFeasible;
  const backwardsPrimed = optionRotation === 'backwards';
  const forwardsPrimed = optionRotation === 'forwards';

  const calculateNextRotation = useCallback(
    (optionList: CarouselOptionStateInterface[]) => {
      console.log('Calculating rotation...');
      const orderId = [...filteredOrders.values()][0];
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
          console.log(order);
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
      dispatchRotationTargets(optionRotations);
      rotationTargetsMapRef.current = optionRotations;
      return optionRotations;
    },
    [filteredOrders, readAnyOrder, readAnyCarousel, dispatchRotationTargets]
  );

  // Update the displayed rotation effect if that is selected.
  useEffect(() => {
    if (
      optionRotation !== undefined &&
      (forwardsCycleRef.current !== forwardsCycle ||
        backwardsCycleRef.current !== backwardsCycle)
    ) {
      if (optionRotation === 'backwards' && backwardsCycle) {
        calculateNextRotation(backwardsCycle);
      } else if (optionRotation === 'forwards' && forwardsCycle) {
        calculateNextRotation(forwardsCycle);
      }
      forwardsCycleRef.current = forwardsCycle;
      backwardsCycleRef.current = backwardsCycle;
    } else if (
      (backwardsCycle === undefined && forwardsCycle === undefined) ||
      optionRotation === undefined
    ) {
      dispatchRotationTargets(new Map());
      dispatchConnectionMap(new Map());
      setOptionRotation(undefined);
    }
  }, [
    calculateNextRotation,
    backwardsCycle,
    forwardsCycle,
    optionRotation,
    dispatchRotationTargets,
    dispatchConnectionMap
  ]);

  useEffect(() => {
    dispatchConnectionMap((oldMap) => {
      if (optionRotation === undefined) return new Map();
      const map = new Map(oldMap);
      const schemaIdList = rotationPrimeList
        .map((primedId) => readAnyOption(primedId))
        .filter(isNotUndefined)
        .map((option) => option.workProjectSeriesSchemaId);
      for (let schemaId in oldMap) {
        if (!schemaIdList.includes(schemaId)) {
          map.delete(schemaId);
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
      dispatch((orders) => {
        const set = new Set(orders);
        set.delete(orderId);
        return set;
      });
      if (filteredOrders.size === 1) {
        dispatchPrimeList([]);
        dispatchRotationTargets(new Map());
        dispatchConnectionMap(new Map());
      }
    },
    [
      writeAnyOrder,
      dispatch,
      dispatchPrimeList,
      filteredOrders.size,
      dispatchRotationTargets,
      dispatchConnectionMap
    ]
  );

  return (
    <ButtonGroup>
      <Button
        isDisabled={backwardsNotFeasible || forwardsPrimed}
        onPress={() => {
          if (backwardsCycle)
            commitNextRotation(calculateNextRotation(backwardsCycle));
        }}
        className={'px-4 min-w-0'}
      >
        <ChevronLeftIcon className={'w-6'} />
      </Button>
      <Button
        className={'min-w-0 px-1'}
        isDisabled={backwardsNotFeasible}
        onPress={() => {
          if (backwardsCycle && optionRotation !== 'backwards') {
            calculateNextRotation(backwardsCycle);
            setOptionRotation('backwards');
          } else {
            setOptionRotation(undefined);
            dispatchRotationTargets(new Map());
          }
        }}
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
        onPress={() => {
          if (forwardsCycle && optionRotation !== 'forwards') {
            calculateNextRotation(forwardsCycle);
            setOptionRotation('forwards');
          } else {
            setOptionRotation(undefined);
            dispatchRotationTargets(new Map());
          }
        }}
      >
        <QuestionMarkCircleIcon className={'w-6'} />
      </Button>
      <Button
        isDisabled={forwardNotFeasible || backwardsPrimed}
        onPress={() => {
          if (forwardsCycle)
            commitNextRotation(calculateNextRotation(forwardsCycle));
        }}
        className={'px-4 min-w-0'}
      >
        <ChevronRightIcon className={'w-6'} />
      </Button>
    </ButtonGroup>
  );
}

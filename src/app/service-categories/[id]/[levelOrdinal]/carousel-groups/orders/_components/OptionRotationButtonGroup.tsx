'use client';
import { Button } from '@nextui-org/button';
import { ButtonGroup } from '@nextui-org/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  useGlobalController,
  useGlobalDispatchAndListener,
  useGlobalWriteAny
} from 'selective-context';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import {
  CarouselOptionState,
  CarouselOptionStateInterface
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import {
  InitialSet,
  RotationPrime
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselGroup';
import { EmptyArray, isNotUndefined } from '@/api/main';
import { useCallback, useMemo } from 'react';
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

const listenerKey = 'optionRotationButtonGroup';
export default function OptionRotationButtonGroup() {
  const readAnyCarousel = useReadAnyDto<CarouselDto>(EntityClassMap.carousel);
  const readAnyOption =
    useReadAnyDto<CarouselOptionStateInterface>(CarouselOptionState);
  const readAnyOrder = useReadAnyDto<CarouselOrderDto>(
    EntityClassMap.carouselOrder
  );
  const {
    currentState: rotationPrimeList,
    dispatchWithoutControl: dispatchPrimeList
  } = useGlobalDispatchAndListener({
    contextKey: RotationPrime,
    listenerKey,
    initialValue: EmptyArray as number[]
  });
  const { currentState: filteredOrders, dispatch } = useGlobalController<
    Set<string>
  >({
    contextKey: 'filteredOrders',
    initialValue: InitialSet as Set<string>,
    listenerKey
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

    console.log(backwardsCycle, forwardsCycle);

    return (
      // isEqual(forwardsCycle, backwardsCycle)
      // ? { forwardsCycle, backwardsCycle: undefined }
      // :
      { forwardsCycle, backwardsCycle }
    );
  }, [rotationPrimeList, readAnyCarousel, readAnyOption, sortingFunction]);

  const rotationNextStudent = useCallback(
    (optionList: CarouselOptionStateInterface[]) => {
      const orderId = [...filteredOrders.values()][0];
      const order = readAnyOrder(orderId);
      if (order === undefined)
        throw Error(`could not find carousel order: ${orderId}`);
      const cycleShifts = [];
      for (let i = 0; i < optionList.length; i++) {
        const carouselOrderItem =
          order.carouselOrderItems[optionList[i].workProjectSeriesSchemaId];
        const nextCarouselId =
          optionList[(i + 1) % optionList.length].carouselId;
        const nextCarousel = readAnyCarousel(nextCarouselId);
        const nextOption = nextCarousel?.carouselOptionDtos?.find(
          (option) =>
            option.workProjectSeriesSchemaId ===
            carouselOrderItem.workProjectSeriesSchemaId
        );
        if (nextOption === undefined) throw Error(`Could not find option!`);
        cycleShifts.push({
          carouselOrderItem,
          nextOption
        });
      }
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
      }
    },
    [
      filteredOrders,
      readAnyOrder,
      readAnyCarousel,
      writeAnyOrder,
      dispatch,
      dispatchPrimeList
    ]
  );

  return (
    <ButtonGroup>
      <Button
        isDisabled={backwardsCycle === undefined || filteredOrders.size === 0}
        onPress={() => {
          if (backwardsCycle) rotationNextStudent(backwardsCycle);
        }}
      >
        <ChevronLeftIcon />
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
        isDisabled={forwardsCycle === undefined || filteredOrders.size === 0}
        onPress={() => {
          if (forwardsCycle) rotationNextStudent(forwardsCycle);
        }}
      >
        <ChevronRightIcon />
      </Button>
    </ButtonGroup>
  );
}

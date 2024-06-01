'use client';
import {
  DtoStoreParams,
  Identifier,
  LazyDtoUiListAll,
  useDtoStore,
  useReadAnyDto
} from 'dto-stores';
import Carousel from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/Carousel';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';
import CarouselOrderManager from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrderManager';
import { Dispatch, memo, SetStateAction, useContext, useEffect } from 'react';
import { SelectiveContextGlobal } from 'selective-context/dist/creators/selectiveContextCreatorGlobal';
import { useGlobalController } from 'selective-context';
import { EmptyArray, isNotUndefined } from '@/api/main';
import {
  CarouselOptionState,
  CarouselOptionStateInterface
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import OptionRotationButtonGroup from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionRotationButtonGroup';
import RotationConnectionOverlay from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/RotationConnectionOverlay';

export const ControllerKey = 'controller';
export const InitialSet = new Set();
export const RotationPrime = 'rotationPrime';
export const HighlightedSubjects = 'highlightedSubjects';

export default function CarouselGroup(params: DtoStoreParams) {
  const { entity } = useDtoStore<CarouselGroupDto>(params);
  useGlobalController({
    contextKey: HighlightedSubjects,
    initialValue: EmptyArray,
    listenerKey: ControllerKey
  });
  const { currentState: rotationPrimeList } = useGlobalController({
    contextKey: RotationPrime,
    initialValue: EmptyArray,
    listenerKey: ControllerKey
  });

  const { currentState: filteredOrders, dispatch } = useGlobalController<
    Set<string>
  >({
    contextKey: 'filteredOrders',
    initialValue: InitialSet as Set<string>,
    listenerKey: ControllerKey
  });

  const readAnyOption =
    useReadAnyDto<CarouselOptionStateInterface>(CarouselOptionState);

  // useEffect(() => {
  //   dispatch(findAssigneeIntersection(rotationPrimeList, readAnyOption));
  // }, [rotationPrimeList, dispatch, readAnyOption]);

  const mutableRefObject = useContext(
    SelectiveContextGlobal.latestValueRefContext
  );
  // const mutableRefObjectListener = useContext(
  //   SelectiveContextGlobal.listenersRefContext
  // );
  console.log(mutableRefObject);

  if (!entity) return null;

  return (
    <Card>
      <CardHeader className={'flex justify-center'}>
        <OptionRotationButtonGroup />
      </CardHeader>
      <CardBody>
        <div
          className={'grid p-4 gap-1'}
          style={{
            gridTemplateColumns: `repeat(${entity.carousels.length}, minmax(0, 1fr))`
            // gridTemplateRows: `repeat(${entity.carouselGroupOptions.length - entity.carousels.length + 1}, minmax(0, 1fr))`
          }}
        >
          <LazyDtoUiListAll
            renderAs={Carousel}
            entityClass={EntityClassMap.carousel}
            whileLoading={() => null}
          />
          <LazyDtoUiListAll
            renderAs={MemoOrderManager}
            entityClass={EntityClassMap.carouselOrder}
            whileLoading={() => null}
          />
        </div>
      </CardBody>
    </Card>
  );
}

const MemoOrderManager = memo(CarouselOrderManager);

export function findAssigneeIntersection(
  rotationPrimeList: number[],
  readAnyOption: (
    optionID: Identifier
  ) => CarouselOptionStateInterface | undefined
) {
  const assigneesFilteredList = rotationPrimeList
    .map((optionId) => readAnyOption(optionId))
    .filter(isNotUndefined)
    .map((option) => new Set(option.carouselOrderAssignees)); // Convert each list to a set

  if (assigneesFilteredList.length === 0) {
    return InitialSet as Set<string>;
  }

  // Sort sets by their size in ascending order
  assigneesFilteredList.sort((a, b) => a.size - b.size);

  // Start with the first (smallest) set of assignees
  let intersectionSet = assigneesFilteredList[0];

  // Intersect with the remaining sets
  for (let i = 1; i < assigneesFilteredList.length; i++) {
    intersectionSet = new Set(
      [...intersectionSet].filter((assignee) =>
        assigneesFilteredList[i].has(assignee)
      )
    );
  }

  return intersectionSet;
}

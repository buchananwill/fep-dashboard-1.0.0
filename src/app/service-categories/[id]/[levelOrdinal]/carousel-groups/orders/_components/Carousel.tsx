import { BaseLazyDtoUiProps } from 'dto-stores';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import CarouselOption, {
  CarouselOptionState
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { memo, useMemo } from 'react';
import { useGlobalListener, useGlobalListenerGroup } from 'selective-context';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { InitialSet } from '@/app/_literals';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';
import {
  FilteredOrders,
  RotationPrime
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { checkOptionCanPrime } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/checkOptionCanPrime';
import { EmptyArray } from '@/api/literals';

function sortCarouselOptionState(
  option1: CarouselOptionStateInterface,
  option2: CarouselOptionStateInterface
) {
  const descAssignees =
    option2.carouselOrderAssignees.length -
    option1.carouselOrderAssignees.length;
  const nameSort =
    option1.name && option2.name ? option1.name.localeCompare(option2.name) : 0;
  const idSort = option1.id - option2.id;
  return descAssignees !== 0
    ? descAssignees
    : nameSort !== 0
      ? nameSort
      : idSort;
}

export default function Carousel({ entity }: BaseLazyDtoUiProps<CarouselDto>) {
  const listenerKey = useUuidListenerKey();
  const optionContextKeyList = useMemo(() => {
    return entity.carouselOptionDtos.map((option) =>
      getEntityNamespaceContextKey(CarouselOptionState, option.id)
    );
  }, [entity.carouselOptionDtos]);
  const { currentState: group } = useGlobalListenerGroup({
    contextKeys: optionContextKeyList,
    listenerKey,
    initialValue: initialMap as Map<string, CarouselOptionStateInterface>
  });

  const { currentState: rotationPrimeList } = useGlobalListener({
    contextKey: RotationPrime,
    listenerKey: listenerKey,
    initialValue: EmptyArray
  });

  const { currentState: filteredOrders } = useGlobalListener<Set<string>>({
    contextKey: FilteredOrders,
    initialValue: InitialSet as Set<string>,
    listenerKey: listenerKey
  });

  const sortedOptionStateList = useMemo(() => {
    return [...group.values()]
      .sort(sortCarouselOptionState)
      .map((carouselOption) => ({
        entity: carouselOption,
        canPrime:
          checkOptionCanPrime(
            carouselOption,
            rotationPrimeList,
            filteredOrders
          ) || rotationPrimeList.includes(carouselOption.id)
      }));
  }, [group, rotationPrimeList, filteredOrders]);

  return (
    <div className={'grid grid-cols-1 gap-1'}>
      {sortedOptionStateList.map((optionProps) => (
        <MemoCarouselOption key={optionProps.entity.id} {...optionProps} />
      ))}
    </div>
  );
}

const MemoCarouselOption = memo(CarouselOption);

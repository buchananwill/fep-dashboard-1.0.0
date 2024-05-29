import { BaseLazyDtoUiProps } from 'dto-stores';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import CarouselOption, {
  CarouselOptionState,
  CarouselOptionStateInterface
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { memo, useMemo, useRef } from 'react';
import {
  useGlobalListener,
  useGlobalListenerGroup,
  useGlobalReadAny
} from 'selective-context';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { InitialSet } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselGroup';
import { EmptyArray } from '@/api/main';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { SelectiveContextReadAll } from 'selective-context/dist/types';

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

  const readAnyOrder = useGlobalReadAny<CarouselOrderDto>();

  const { currentState: rotationPrimeList } = useGlobalListener({
    contextKey: 'rotationPrime',
    listenerKey: listenerKey,
    initialValue: EmptyArray
  });

  const { currentState: filteredOrders } = useGlobalListener<Set<string>>({
    contextKey: 'filteredOrders',
    initialValue: InitialSet as Set<string>,
    listenerKey: listenerKey
  });

  const sortedOptionStateList = useMemo(() => {
    return [...group.values()]
      .sort((option1, option2) => {
        const descAssignees =
          option2.carouselOrderAssignees.length -
          option1.carouselOrderAssignees.length;
        const nameSort =
          option1.name && option2.name
            ? option1.name.localeCompare(option2.name)
            : 0;
        const idSort = option1.id - option2.id;
        return descAssignees !== 0
          ? descAssignees
          : nameSort !== 0
            ? nameSort
            : idSort;
      })
      .map((carouselOption) => ({
        entity: carouselOption,
        canPrime: checkCanPrime(
          carouselOption,
          rotationPrimeList,
          filteredOrders,
          readAnyOrder,
          entity
        )
      }));
  }, [group, rotationPrimeList, filteredOrders, readAnyOrder, entity]);

  return (
    <div className={'grid grid-cols-1 gap-1'}>
      {sortedOptionStateList.map(({ entity, canPrime }) => (
        <MemoCarouselOption
          key={entity.id}
          entity={entity}
          canPrime={canPrime}
        />
      ))}
    </div>
  );
}

const MemoCarouselOption = memo(CarouselOption);

export function useUuidListenerKey() {
  return useRef(crypto.randomUUID()).current;
}

function checkCanPrime(
  option: CarouselOptionStateInterface,
  rotationPrimeList: number[],
  filteredOrders: Set<string>,
  readAnyOrder: SelectiveContextReadAll<CarouselOrderDto>,
  carousel: CarouselDto
) {
  return (
    option.carouselOrderAssignees.length > 0 &&
    (rotationPrimeList.length === 0 ||
      option.carouselOrderAssignees.some((order) => filteredOrders.has(order)))
  );
}

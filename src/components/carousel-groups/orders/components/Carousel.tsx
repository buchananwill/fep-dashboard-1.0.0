import { BaseLazyDtoUiProps, NamespacedHooks } from 'dto-stores';
import { CarouselDto } from '@/api/generated-types/generated-types_';
import CarouselOption, {
  CarouselOptionState
} from '@/components/carousel-groups/orders/components/option/CarouselOption';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useGlobalListener, useGlobalListenerGroup } from 'selective-context';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';
import { initialMap, InitialSet } from '@/app/_literals';
import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';
import {
  FilteredOrders,
  RotationPrime
} from '@/components/carousel-groups/orders/_literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { checkOptionCanPrime } from '@/components/carousel-groups/orders/_functions/checkOptionCanPrime';
import { EmptyArray } from '@/api/client-literals';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { transformOptionForClientState } from '@/components/carousel-groups/orders/_functions/transformOptionForClientState';
import { LayoutGroup } from 'framer-motion';

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
  const initialEntity = useRef(entity);
  const dispatchOptionMasterList = NamespacedHooks.useDispatch<
    CarouselOptionStateInterface[]
  >(CarouselOptionState, KEY_TYPES.MASTER_LIST);

  useEffect(() => {
    if (entity !== initialEntity.current) {
      dispatchOptionMasterList((list) => {
        const filteredList = list.filter(
          (option) => option.carouselId !== entity.id
        );
        const optionStates = transformOptionForClientState([entity]);
        return [...filteredList, ...optionStates];
      });
      initialEntity.current = entity;
    }
  }, [dispatchOptionMasterList, entity]);

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
      <LayoutGroup>
        {sortedOptionStateList.map((optionProps) => (
          <MemoCarouselOption key={optionProps.entity.id} {...optionProps} />
        ))}
      </LayoutGroup>
    </div>
  );
}

const MemoCarouselOption = memo(CarouselOption);

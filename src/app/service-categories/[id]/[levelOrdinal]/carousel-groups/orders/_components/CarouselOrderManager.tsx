import { BaseDtoUiProps, NamespacedHooks } from 'dto-stores';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { useEffect, useRef } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/main';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import { useGlobalListener, useGlobalWriteAny } from 'selective-context';
import { OptionMap } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionMapManager';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import { produce } from 'immer';
import { isEqual } from 'lodash';

export default function CarouselOrderManager({
  entity
}: BaseDtoUiProps<CarouselOrderDto>) {
  const orderItemSchemaIdList = useRef(Object.keys(entity.carouselOrderItems));
  const orderItems = useRef(entity.carouselOrderItems);

  const listenerKey = `orderManager:${entity.id}`;
  const { currentState: carouselList } = NamespacedHooks.useListen<
    CarouselDto[]
  >(EntityClassMap.carousel, KEY_TYPES.MASTER_LIST, listenerKey, EmptyArray);

  const { currentState: optionMap } = useGlobalListener({
    contextKey: OptionMap,
    initialValue: initialMap as Map<string, CarouselOptionDto[]>,
    listenerKey
  });

  const { dispatchWriteAny } = useGlobalWriteAny<CarouselOptionState>();

  useEffect(() => {
    Object.values(entity.carouselOrderItems).forEach((item) => {
      const prevItem = orderItems.current[item.workProjectSeriesSchemaId];
      prevItem.active = item.active;
      if (item.active) {
        dispatchWriteAny(
          `CarouselOrderState:${item.carouselOptionId}`,
          (state) =>
            produce(state, (draft) => {
              draft.assignees.includes();
            })
        );
      }
    });
  }, []);
}

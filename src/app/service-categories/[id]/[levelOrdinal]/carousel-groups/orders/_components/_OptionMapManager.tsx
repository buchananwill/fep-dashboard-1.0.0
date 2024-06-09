import {
  NamespacedHooks,
  useEffectSyncDeepEqualWithDispatch
} from 'dto-stores';
import { useMemo } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { useGlobalController } from 'selective-context';
import { EmptyArray } from '@/api/literals';

const listenerKey = `optionMapManager`;
export const OptionMap = 'optionMap';
export default function _OptionMapManager() {
  const { currentState: carouselList } = NamespacedHooks.useListen<
    CarouselDto[]
  >(EntityClassMap.carousel, KEY_TYPES.MASTER_LIST, listenerKey, EmptyArray);

  const optionMap = useMemo(() => {
    const optionMap = new Map<string, CarouselOptionDto[]>();
    for (let carouselListElement of carouselList) {
      for (let carouselOptionDto of carouselListElement.carouselOptionDtos) {
        const optionList = optionMap.get(
          carouselOptionDto.workProjectSeriesSchemaId
        );
        if (optionList) {
          optionList.push(carouselOptionDto);
        } else {
          optionMap.set(carouselOptionDto.workProjectSeriesSchemaId, [
            carouselOptionDto
          ]);
        }
      }
    }
    return optionMap;
  }, [carouselList]);

  const { dispatch } = useGlobalController({
    contextKey: OptionMap,
    listenerKey: 'controller',
    initialValue: optionMap
  });

  useEffectSyncDeepEqualWithDispatch(optionMap, dispatch);
}

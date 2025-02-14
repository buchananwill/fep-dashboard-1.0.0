'use server';
import { getCarouselGroups } from '@/components/carousel-groups/orders/getCarouselGroups';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { CarouselGroupDto } from '@/api/generated-types/generated-types_';
import { HeatMapSerie } from '@nivo/heatmap';

import { ChordMapWithMetaData, NivoChordMetaData } from '@/api/types';
import { API_V2_URL } from '@/api/server-literals';

export async function getHeatMapSeriesList(levelOrdinal: string, id: string) {
  const [carouselGroup] = await getCarouselGroups(levelOrdinal, id);

  return await postEntitiesWithDifferentReturnType<
    CarouselGroupDto,
    HeatMapSerie<any, any>[]
  >(carouselGroup, `${API_V2_URL}/carouselGroups/orders/coAppearanceHeatMap`);
}
export async function getChordMap(levelOrdinal: string, id: string) {
  const [carouselGroup] = await getCarouselGroups(levelOrdinal, id);

  return await postEntitiesWithDifferentReturnType<
    CarouselGroupDto,
    ChordMapWithMetaData<NivoChordMetaData>
  >(carouselGroup, `${API_V2_URL}/carouselGroups/orders/coAppearanceChordMap`);
}

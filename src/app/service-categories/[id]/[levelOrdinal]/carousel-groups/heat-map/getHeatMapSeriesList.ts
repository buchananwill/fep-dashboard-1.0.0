'use server';
import { getCarouselGroups } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/getCarouselGroups';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { CarouselGroupDto } from '@/api/zod-schemas/CarouselGroupDtoSchema';
import { HeatMapSerie } from '@nivo/heatmap';

import { API_V2_URL } from '@/api/literals';
import { ChordMapWithMetaData, NivoChordMetaData } from '@/api/types';

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

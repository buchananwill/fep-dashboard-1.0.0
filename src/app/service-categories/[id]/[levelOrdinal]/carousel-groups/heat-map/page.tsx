import { getCarouselGroups } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/getCarouselGroups';
import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/serviceCategoryRouteParams';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { API_V2_URL, BASE_URL, EmptyArray } from '@/api/main';
import HeatMapCarouselOrders from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/heat-map/_components/HeatMapCarouselOrders';
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDtoListByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';
import { HeatMapSerie } from '@nivo/heatmap';

export default async function page({
  params: { levelOrdinal, id }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const [carouselGroup] = await getCarouselGroups(levelOrdinal, id);

  const heatMapSeriesList = await postEntitiesWithDifferentReturnType<
    CarouselGroupDto,
    HeatMapSerie<any, any>[]
  >(carouselGroup, `${API_V2_URL}/carouselGroups/orders/coAppearanceHeatMap`);

  return (
    <div className={'w-[100vw] h-[100vh] p-16'}>
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        getServerAction={getDtoListByBodyList}
      />
      <HeatMapCarouselOrders data={heatMapSeriesList} />
    </div>
  );
}

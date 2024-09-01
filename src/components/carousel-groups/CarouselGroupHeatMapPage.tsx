import { ServiceCategoryRouteParams } from '@/app/work-project-series-schemas/serviceCategoryRouteParams';
import HeatMapCarouselOrders from '@/components/carousel-groups/_components/HeatMapCarouselOrders';
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDtoListByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { getHeatMapSeriesList } from '@/components/carousel-groups/getHeatMapSeriesList';
import { EmptyArray } from '@/api/literals';

export default async function carouselGroupHeatMapPage({
  params: { levelOrdinal, id }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const heatMapSeriesList = await getHeatMapSeriesList(levelOrdinal, id);

  return (
    <div className={'h-[100vh] w-[100vw] p-8'}>
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        getServerAction={getDtoListByBodyList}
      />
      <HeatMapCarouselOrders data={heatMapSeriesList} />
    </div>
  );
}

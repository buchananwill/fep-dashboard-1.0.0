import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/serviceCategoryRouteParams';
import HeatMapCarouselOrders from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/heat-map/_components/HeatMapCarouselOrders';
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDtoListByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { getHeatMapSeriesList } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/heat-map/getHeatMapSeriesList';
import { EmptyArray } from '@/api/literals';

export default async function page({
  params: { levelOrdinal, id }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const heatMapSeriesList = await getHeatMapSeriesList(levelOrdinal, id);

  return (
    <div className={'w-[100vw] h-[100vh] p-8'}>
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        getServerAction={getDtoListByBodyList}
      />
      <HeatMapCarouselOrders data={heatMapSeriesList} />
    </div>
  );
}

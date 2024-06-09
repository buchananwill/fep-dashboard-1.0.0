import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/serviceCategoryRouteParams';
import { getChordMap } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/heat-map/getHeatMapSeriesList';
import ChordMapCarouselOrders from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/chord-map/_components/ChordMapCarouselOrders';

export default async function page({
  params: { levelOrdinal, id }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const data = await getChordMap(levelOrdinal, id);

  return (
    <div className={'w-[800px] h-[800px]'}>
      <ChordMapCarouselOrders
        data={data.chordMapData}
        keys={data.metaData.keys}
      />
    </div>
  );
}

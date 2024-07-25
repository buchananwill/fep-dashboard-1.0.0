import { ServiceCategoryRouteParams } from '@/app/work-project-series-schemas/serviceCategoryRouteParams';
import { getChordMap } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/heat-map/getHeatMapSeriesList';
import ChordMapCarouselOrders from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/chord-map/_components/ChordMapCarouselOrders';

export default async function page({
  params: { levelOrdinal, id }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const data = await getChordMap(levelOrdinal, id);

  return (
    <div className={'h-[800px] w-[800px]'}>
      <ChordMapCarouselOrders
        data={data.chordMapData}
        keys={data.metaData.keys}
      />
    </div>
  );
}

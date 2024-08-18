import { ServiceCategoryRouteParams } from '@/app/work-project-series-schemas/serviceCategoryRouteParams';
import { getChordMap } from '@/components/carousel-groups/getHeatMapSeriesList';
import ChordMapCarouselOrders from '@/components/carousel-groups/_components/ChordMapCarouselOrders';

export default async function carouselGroupChordMapPage({
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

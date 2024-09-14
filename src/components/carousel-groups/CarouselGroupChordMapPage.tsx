import { getChordMap } from '@/api/actions-custom/getHeatMapSeriesList';
import ChordMapCarouselOrders from '@/components/carousel-groups/_components/ChordMapCarouselOrders';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/functions/getLastNVariables';

export default async function carouselGroupChordMapPage({
  pathVariables
}: LeafComponentProps) {
  const [levelOrdinal, id] = getLastNVariables(pathVariables, 2);
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

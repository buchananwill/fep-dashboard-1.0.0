import HeatMapCarouselOrders from '@/components/carousel-groups/_components/HeatMapCarouselOrders';
import { DataFetchingEditDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDtoListByBodyList } from '@/api/generated-actions/WorkSchema';
import { getHeatMapSeriesList } from '@/api/actions-custom/getHeatMapSeriesList';
import { EmptyArray } from '@/api/client-literals';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export default async function carouselGroupHeatMapPage({
  pathVariables
}: LeafComponentProps) {
  const [levelOrdinal, id] = getLastNVariables(pathVariables, 2);
  const heatMapSeriesList = await getHeatMapSeriesList(levelOrdinal, id);

  return (
    <div className={'h-[100vh] w-[100vw] p-8'}>
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        entityClass={EntityClassMap.workSchema}
        getServerAction={getDtoListByBodyList}
      />
      <HeatMapCarouselOrders data={heatMapSeriesList} />
    </div>
  );
}

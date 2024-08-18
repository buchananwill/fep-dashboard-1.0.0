import { EntityClassMap } from '@/api/entity-class-map';
import ServiceCategoryCard from '@/app/service-categories/_components/ServiceCategoryCard';

import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';

export default async function KnowledgeLevelSeries({
  pathVariables,
  depth
}: LeafComponentProps) {
  let data = await Api.KnowledgeLevelSeries.getOne(
    parseInt(pathVariables[depth - 1])
  );

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.knowledgeLevelSeries}
        dtoList={[data]}
        updateServerAction={Api.KnowledgeLevelSeries.putList}
        deleteServerAction={Api.KnowledgeLevelSeries.deleteIdList}
      />
      <ServiceCategoryCard id={data.id} />
    </>
  );
}

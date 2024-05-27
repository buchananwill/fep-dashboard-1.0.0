import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';
import { getKnowledgeLevelPartial } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/getLevelPartialAndSchemaList';
import { getDtoListByExampleList as getKnowledgeLevelsByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import { getDtoListByExampleList as getCarouselGroupsByExampleList } from '@/api/generated-actions/CarouselGroup';
import { getDtoListByExampleList } from '@/api/generated-actions/CarouselOrder';
import { PartialDeep } from 'type-fest';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDtoListByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { getDtoListByBodyList as getCarouselByList } from '@/api/generated-actions/Carousel';
import { getDtoListByBodyList as getWorkTaskTypeByList } from '@/api/generated-actions/WorkTaskType';
import CarouselGroup from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselGroup';
import { EmptyArray } from '@/api/main';

export default async function page({
  params: { levelOrdinal, id }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const { levelPartial } = getKnowledgeLevelPartial(levelOrdinal, id);

  const kLevelList = await getKnowledgeLevelsByExampleList([levelPartial]);

  const [knowledgeLevel] = kLevelList;

  const carouselGroupDtos = await getCarouselGroupsByExampleList([
    { knowledgeLevel: knowledgeLevel }
  ]);

  const exampleList: PartialDeep<CarouselOrderDto>[] = carouselGroupDtos.map(
    (group) => ({ carouselGroupId: group.id })
  );

  const schemaIdList = carouselGroupDtos.flatMap((dto) =>
    dto.carouselGroupOptions.map((option) => option.workProjectSeriesSchemaId)
  );
  const carouselIdList = carouselGroupDtos.flatMap((dto) =>
    dto.carousels.map((carousel) => carousel.id)
  );

  const carouselOrderList = await getDtoListByExampleList(exampleList);

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.carouselGroup}
        dtoList={carouselGroupDtos}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={'CarouselOptionState'}
        dtoList={EmptyArray}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.carouselOrder}
        dtoList={carouselOrderList}
      />
      <DataFetchingEditDtoControllerArray
        idList={schemaIdList}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        getServerAction={getDtoListByBodyList}
      />
      <DataFetchingEditDtoControllerArray
        idList={carouselIdList}
        entityClass={EntityClassMap.carousel}
        getServerAction={getCarouselByList}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        entityClass={EntityClassMap.workTaskType}
        getServerAction={getWorkTaskTypeByList}
      />
      <CarouselGroup
        entityClass={EntityClassMap.carouselGroup}
        entityId={carouselGroupDtos[0].id}
      />
    </>
  );
}

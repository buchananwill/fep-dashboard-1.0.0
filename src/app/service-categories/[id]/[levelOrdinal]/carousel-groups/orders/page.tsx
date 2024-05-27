import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';
import { getKnowledgeLevelPartial } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/getLevelPartialAndSchemaList';
import { getDtoListByExampleList as getKnowledgeLevelsByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import { getDtoListByExampleList as getCarouselGroupsByExampleList } from '@/api/generated-actions/CarouselGroup';
import { getDtoListByExampleList } from '@/api/generated-actions/CarouselOrder';
import { PartialDeep } from 'type-fest';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';

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

  const carouselOrderList = await getDtoListByExampleList(exampleList);

  return (
    <EditAddDeleteDtoControllerArray
      entityClass={EntityClassMap.carouselOrder}
      dtoList={carouselOrderList}
    />
  );
}

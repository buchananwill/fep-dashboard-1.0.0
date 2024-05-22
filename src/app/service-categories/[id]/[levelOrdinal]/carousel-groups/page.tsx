import { getDtoListByExampleList as getKnowledgeLevelsByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import { EntityClassMap } from '@/api/entity-class-map';
import CarouselGroupTabGroup from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/components/CarouselGroupTabGroup';
import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';
import { getLevelPartialAndSchemaList } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/getLevelPartialAndSchemaList';
import {
  deleteIdList,
  postList,
  putList,
  getDtoListByExampleList as getCarouselGroupsByExampleList
} from '@/api/generated-actions/CarouselGroup';

export default async function Page({
  params: { levelOrdinal, id }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const { levelPartial, workProjectSeriesSchemaList: data } =
    await getLevelPartialAndSchemaList(levelOrdinal, id);

  const kLevelList = await getKnowledgeLevelsByExampleList([levelPartial]);

  const [knowledgeLevel] = kLevelList;

  const carouselGroupDtos = await getCarouselGroupsByExampleList([
    { knowledgeLevel: knowledgeLevel }
  ]);

  const workProjectSeriesSchemaList = data.filter(
    (schema) => !schema.name.toLowerCase().includes('carousel')
  );

  return (
    <CarouselGroupTabGroup
      collectionData={carouselGroupDtos}
      referencedItemData={workProjectSeriesSchemaList}
      collectionEntityClass={EntityClassMap.carouselGroup}
      referencedEntityClass={EntityClassMap.workProjectSeriesSchema}
      knowledgeLevel={knowledgeLevel}
      updateServerAction={putList}
      postServerAction={postList}
      deleteServerAction={deleteIdList}
    />
  );
}

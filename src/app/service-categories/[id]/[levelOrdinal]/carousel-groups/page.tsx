import { MissingData } from '@/components/generic/MissingData';
import { getDtoListByExampleList as getCarouselGroupsByExampleList } from '@/app/api/generated-actions/CarouselGroup';
import { getDtoListByExampleList as getKnowledgeLevelsByExampleList } from '@/app/api/generated-actions/KnowledgeLevel';
import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { SECONDARY_EDUCATION_CATEGORY_ID } from '@/app/api/main';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { getWorkProjectSeriesSchemasByKnowledgeLevel } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/getWorkProjectSeriesSchemasByKnowledgeLevel';
import CarouselGroupTabGroup from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/components/CarouselGroupTabGroup';
import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';
import { getLevelPartialAndSchemaList } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/getLevelPartialAndSchemaList';

export default async function Page({
  params: { levelOrdinal, serviceCategoryId }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const { levelPartial, workProjectSeriesSchemaList: data } =
    await getLevelPartialAndSchemaList(levelOrdinal, serviceCategoryId);

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
    />
  );
}

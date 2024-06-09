'use server';
import { getKnowledgeLevelPartial } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/getLevelPartialAndSchemaList';
import { getDtoListByExampleList as getKnowledgeLevelsByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import { getDtoListByExampleList as getCarouselGroupsByExampleList } from '@/api/generated-actions/CarouselGroup';

export async function getCarouselGroups(
  levelOrdinal: string,
  serviceCategoryId: string
) {
  const { levelPartial } = getKnowledgeLevelPartial(
    levelOrdinal,
    serviceCategoryId
  );

  const kLevelList = await getKnowledgeLevelsByExampleList([levelPartial]);

  const [knowledgeLevel] = kLevelList;

  return await getCarouselGroupsByExampleList([
    { knowledgeLevel: knowledgeLevel }
  ]);
}

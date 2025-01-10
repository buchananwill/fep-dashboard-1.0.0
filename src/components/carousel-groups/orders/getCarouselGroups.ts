'use server';
import { getKnowledgeLevelPartial } from '@/components/work-schema/_functions/getLevelPartialAndSchemaList';
import { Api } from '@/api/clientApi_';

export async function getCarouselGroups(
  levelOrdinal: string,
  serviceCategoryId: string
) {
  const { levelPartial } = getKnowledgeLevelPartial(
    levelOrdinal,
    serviceCategoryId
  );

  const kLevelList = await Api.KnowledgeLevel.getDtoListByExampleList([
    levelPartial
  ]);

  const [knowledgeLevel] = kLevelList;

  return await Api.CarouselGroup.getDtoListByExampleList([
    { knowledgeLevel: knowledgeLevel }
  ]);
}

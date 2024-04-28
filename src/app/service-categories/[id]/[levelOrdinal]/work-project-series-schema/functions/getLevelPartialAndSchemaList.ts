import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { getWorkProjectSeriesSchemasByKnowledgeLevel } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/getWorkProjectSeriesSchemasByKnowledgeLevel';

export async function getLevelPartialAndSchemaList(
  levelOrdinal: string,
  serviceCategoryId: string
) {
  const levelOrdinalInt = parseInt(levelOrdinal);
  const levelPartial: Partial<KnowledgeLevelDto> = {
    levelOrdinal: levelOrdinalInt,
    serviceCategoryId: parseInt(serviceCategoryId)
  };

  const workProjectSeriesSchemaList =
    await getWorkProjectSeriesSchemasByKnowledgeLevel(levelOrdinalInt);
  return { levelPartial, workProjectSeriesSchemaList };
}

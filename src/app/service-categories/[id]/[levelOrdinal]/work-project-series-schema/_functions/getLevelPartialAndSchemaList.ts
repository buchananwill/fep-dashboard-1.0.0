import { workProjectSeriesSchemaActionSequence } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/_functions/workProjectSeriesSchemaActionSequence';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';

export function getKnowledgeLevelPartial(
  levelOrdinal: string,
  serviceCategoryId: string
) {
  const levelOrdinalInt = parseInt(levelOrdinal);
  const serviceCategoryIdInt = parseInt(serviceCategoryId);
  const levelPartial: Partial<KnowledgeLevelDto> = {
    levelOrdinal: levelOrdinalInt,
    serviceCategoryId: serviceCategoryIdInt
  };
  return { levelOrdinalInt, serviceCategoryIdInt, levelPartial };
}

export async function getLevelPartialAndSchemaList(
  levelOrdinal: string,
  serviceCategoryId: string
) {
  const { levelOrdinalInt, serviceCategoryIdInt, levelPartial } =
    getKnowledgeLevelPartial(levelOrdinal, serviceCategoryId);

  const { workProjectSeriesSchemas: workProjectSeriesSchemaList } =
    await workProjectSeriesSchemaActionSequence({
      levelOrdinal: levelOrdinalInt,
      serviceCategoryId: serviceCategoryIdInt
    });
  return { levelPartial, workProjectSeriesSchemaList };
}

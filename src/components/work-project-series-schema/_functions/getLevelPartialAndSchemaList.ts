import { workProjectSeriesSchemaActionSequence } from '@/components/work-project-series-schema/_functions/workProjectSeriesSchemaActionSequence';
import { PartialDeep } from 'type-fest';
import { KnowledgeLevelDto } from '@/api/generated-types/generated-types';

export function getKnowledgeLevelPartial(
  levelOrdinal: string,
  serviceCategoryId: string
) {
  const levelOrdinalInt = parseInt(levelOrdinal);
  const serviceCategoryIdInt = parseInt(serviceCategoryId);
  const levelPartial: PartialDeep<KnowledgeLevelDto> = {
    levelOrdinal: levelOrdinalInt,
    knowledgeLevelSeriesId: serviceCategoryIdInt
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
      knowledgeLevel: { levelOrdinal: levelOrdinalInt },
      knowledgeLevelSeriesId: serviceCategoryIdInt
    });
  return { levelPartial, workProjectSeriesSchemaList };
}

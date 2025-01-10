import { workSchemaActionSequence } from '@/components/work-schema/_functions/workSchemaActionSequence';
import { PartialDeep } from 'type-fest';
import { KnowledgeLevelDto } from '@/api/generated-types/generated-types_';

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

  const { workSchemas: workSchemaList } = await workSchemaActionSequence({
    knowledgeLevel: { levelOrdinal: levelOrdinalInt },
    knowledgeLevelSeriesId: serviceCategoryIdInt
  });
  return { levelPartial, workSchemaList };
}

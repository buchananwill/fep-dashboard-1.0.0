import { workProjectSeriesSchemaActionSequence } from '@/app/work-project-series-schemas/_functions/workProjectSeriesSchemaActionSequence';
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
      knowledgeLevel: { levelOrdinal: levelOrdinalInt },
      serviceCategoryId: serviceCategoryIdInt
    });
  return { levelPartial, workProjectSeriesSchemaList };
}

import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { workProjectSeriesSchemaActionSequence } from '@/utils/data-fetching/workProjectSeriesSchemaActionSequence';

export async function getLevelPartialAndSchemaList(
  levelOrdinal: string,
  serviceCategoryId: string
) {
  const levelOrdinalInt = parseInt(levelOrdinal);
  const serviceCategoryIdInt = parseInt(serviceCategoryId);
  const levelPartial: Partial<KnowledgeLevelDto> = {
    levelOrdinal: levelOrdinalInt,
    serviceCategoryId: serviceCategoryIdInt
  };

  const { workProjectSeriesSchemas: workProjectSeriesSchemaList } =
    await workProjectSeriesSchemaActionSequence({
      levelOrdinal: levelOrdinalInt,
      serviceCategoryId: serviceCategoryIdInt
    });
  return { levelPartial, workProjectSeriesSchemaList };
}

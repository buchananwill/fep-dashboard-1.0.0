import { KnowledgeLevelDto } from '@/api/zod-schemas/KnowledgeLevelDtoSchema';

export function sortLevelsOnOrdinal(
  level1: KnowledgeLevelDto,
  level2: KnowledgeLevelDto
) {
  return level1.levelOrdinal - level2.levelOrdinal;
}
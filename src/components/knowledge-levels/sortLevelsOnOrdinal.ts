import { KnowledgeLevelDto } from '@/api/generated-types/generated-types_';

export function sortLevelsOnOrdinal(
  level1: KnowledgeLevelDto,
  level2: KnowledgeLevelDto
) {
  return level1.levelOrdinal - level2.levelOrdinal;
}

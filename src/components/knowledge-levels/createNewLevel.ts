import { KnowledgeLevelDto } from '@/api/generated-types/generated-types';
import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types';
import { makeTransientId } from '@/functions/makeTransientId';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';

export function createNewLevel(
  sortedLevels: KnowledgeLevelDto[],
  knowledgeLevelSeriesDto: KnowledgeLevelSeriesDto
) {
  const levelOrdinal =
    sortedLevels.length > 0
      ? sortedLevels[sortedLevels.length - 1].levelOrdinal + 1
      : 1;
  const name = `${knowledgeLevelSeriesDto.knowledgeLevelDescriptor} ${levelOrdinal}`;
  const id = makeTransientId(ABSOLUTE_SMALLEST_TRANSIENT_ID + levelOrdinal);
  const nextLevel: KnowledgeLevelDto = {
    name,
    levelOrdinal,
    id,
    knowledgeLevelSeriesId: knowledgeLevelSeriesDto.id
  };
  return nextLevel;
}

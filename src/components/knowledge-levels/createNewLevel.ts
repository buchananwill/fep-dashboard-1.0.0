import { KnowledgeLevelDto } from '@/api/generated-types/generated-types_';
import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types_';
import { makeTransientId } from '@/functions/makeTransientId';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';

export function createNewLevel(
  sortedLevels: KnowledgeLevelDto[],
  knowledgeLevelSeriesDto: KnowledgeLevelSeriesDto
) {
  const hasLevels = sortedLevels.length > 0;
  let levelOrdinal = 1;
  if (hasLevels) {
    levelOrdinal = sortedLevels[sortedLevels.length - 1].levelOrdinal + 1;
  }
  const name = `${knowledgeLevelSeriesDto.knowledgeLevelDescriptor} ${levelOrdinal}`;
  const id = idDecrementer();
  const nextLevel: KnowledgeLevelDto = {
    name,
    levelOrdinal,
    id,
    knowledgeLevelSeriesId: knowledgeLevelSeriesDto.id
  };
  return nextLevel;
}

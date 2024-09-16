import { isNotUndefined } from '@/api/main';
import { WorkTaskTypeInitTable } from '@/utils/init-json-data/service-categories/workTaskTypeInitTable';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';

export function getWorkTaskTypeTableLookUp(table: WorkTaskTypeInitTable) {
  return function (
    knowledgeDomainDto: KnowledgeDomainDto,
    knowledgeLevelDto: KnowledgeLevelDto
  ): number | undefined {
    const row = table[knowledgeDomainDto.name];
    if (isNotUndefined(row)) return row[knowledgeLevelDto.levelOrdinal];
  };
}

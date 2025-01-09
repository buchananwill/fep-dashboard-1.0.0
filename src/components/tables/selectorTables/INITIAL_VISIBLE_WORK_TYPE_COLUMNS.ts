import { WorkTypeDto } from '@/api/generated-types/generated-types_';
import { ColumnUid } from '@/types';

export const INITIAL_VISIBLE_WORK_TYPE_COLUMNS: ColumnUid<WorkTypeDto>[] = [
  'name',
  'knowledgeDomain.name',
  'knowledgeDomain.shortCode',
  'knowledgeLevel.levelOrdinal'
];

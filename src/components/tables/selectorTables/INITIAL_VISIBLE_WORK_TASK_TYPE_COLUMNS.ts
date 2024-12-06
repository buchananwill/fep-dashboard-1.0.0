import { Paths } from 'type-fest';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types_';
import { ColumnUid } from '@/types';

export const INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS: ColumnUid<WorkTaskTypeDto>[] =
  [
    'name',
    'knowledgeDomain.name',
    'knowledgeDomain.shortCode',
    'knowledgeLevel.levelOrdinal'
  ];

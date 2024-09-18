import { Paths } from 'type-fest';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';

export const INITIAL_VISIBLE_WORK_TASK_TYPE_COLUMNS: Paths<WorkTaskTypeDto>[] =
  [
    'name',
    'knowledgeDomain.name',
    'knowledgeDomain.shortCode',
    'knowledgeLevel.levelOrdinal'
  ];
import { Column } from '@/types';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import { startCase } from 'lodash';
import { getDomainAlias } from '@/api/getDomainAlias';

export const WORK_TASK_TYPE_COLUMNS: Column<WorkTaskTypeDto>[] = [
  { name: 'Name', uid: 'name', sortable: true },
  {
    name: startCase(getDomainAlias('knowledgeDomain')),
    uid: 'knowledgeDomain.name',
    sortable: true
  },
  { name: 'ShortCode', uid: 'knowledgeDomain.shortCode', sortable: true },
  {
    name: startCase(getDomainAlias('knowledgeLevel')),
    uid: 'knowledgeLevel.levelOrdinal',
    sortable: true
  },
  {
    name: startCase(getDomainAlias('knowledgeLevel') + 'Name'),
    uid: 'knowledgeLevel.name',
    sortable: true
  }
];
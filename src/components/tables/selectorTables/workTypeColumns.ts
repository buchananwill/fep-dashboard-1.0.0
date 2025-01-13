import { Column } from '@/types';
import { WorkTypeDto } from '@/api/generated-types/generated-types_';
import { startCase } from 'lodash';
import { getDomainAlias } from '@/api/getDomainAlias';

export const WORK_TYPE_COLUMNS: Column<WorkTypeDto>[] = [
  { name: 'Category', uid: 'workTypeCategory.name', sortable: true },
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

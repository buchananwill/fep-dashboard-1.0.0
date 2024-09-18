import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { StringValueChip } from '@/components/tables/StringValueChip';
import { DeleteEntity } from '@/components/tables/edit-tables/DeleteEntity';
import { EntityClassMap } from '@/api/entity-class-map';

export const WorkTaskTypeCell = getCellRenderFunction(
  {
    name: SimpleValueToString,
    'knowledgeDomain.name': SimpleValueToString,
    'knowledgeDomain.shortCode': StringValueChip,
    'knowledgeLevel.levelOrdinal': SimpleValueToString,
    'knowledgeLevel.name': SimpleValueToString,
    action: DeleteEntity
  },
  EntityClassMap.workTaskType
);
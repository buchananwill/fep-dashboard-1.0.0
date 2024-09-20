import { getCellRenderFunction } from '@/components/tables/GetCellRenderFunction';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { StringValueChip } from '@/components/tables/StringValueChip';
import { DeleteEntity } from '@/components/tables/edit-tables/DeleteEntity';

export const WorkTaskTypeCell = getCellRenderFunction('workTaskType', {
  'knowledgeDomain.name': SimpleValueToString,
  'knowledgeDomain.shortCode': StringValueChip,
  'knowledgeLevel.levelOrdinal': SimpleValueToString,
  'knowledgeLevel.name': SimpleValueToString,
  name: SimpleValueToString
});

getCellRenderFunction('workTaskType', {
  id: DeleteEntity,
  name: SimpleValueToString,
  'knowledgeDomain.name': SimpleValueToString,
  'knowledgeLevel.levelOrdinal': SimpleValueToString,
  'knowledgeDomain.shortCode': StringValueChip,
  'knowledgeLevel.name': SimpleValueToString
});
